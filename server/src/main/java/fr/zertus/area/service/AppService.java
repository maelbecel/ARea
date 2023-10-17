package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.discord.DiscordApp;
import fr.zertus.area.app.github.GithubApp;
import fr.zertus.area.app.google.GoogleApp;
import fr.zertus.area.app.notion.NotionApp;
import fr.zertus.area.app.spotify.SpotifyApp;
import fr.zertus.area.app.twitch.TwitchApp;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import java.net.URI;
import java.util.*;

@Service
public class AppService {

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Autowired
    private UserService userService;

    private static final Map<String, App> apps = new HashMap<>();
    static {
        GithubApp githubApp = new GithubApp();
        apps.put(githubApp.getSlug(), githubApp);

        TwitchApp twitchApp = new TwitchApp();
        apps.put(twitchApp.getSlug(), twitchApp);

        DiscordApp discordApp = new DiscordApp();
        apps.put(discordApp.getSlug(), discordApp);

        SpotifyApp spotifyApp = new SpotifyApp();
        apps.put(spotifyApp.getSlug(), spotifyApp);

        NotionApp notionApp = new NotionApp();
        apps.put(notionApp.getSlug(), notionApp);

        GoogleApp googleApp = new GoogleApp();
        apps.put(googleApp.getSlug(), googleApp);
    }

    private static final Map<Long, String> redirectUris = new HashMap<>();

    public App getApp(String slug) {
        return apps.get(slug);
    }

    public List<App> getApps() {
        return new ArrayList<>(apps.values());
    }

    /**
     * Redirect to the OAuth2 app
     * @param slug the slug of the app
     * @return a response entity with the redirection
     * @throws DataNotFoundException if the app is not found
     */
    public ResponseEntity<ApiResponse<String>> redirectOAuth2App(String slug, Long userId, String redirectUri) {
        App app = getApp(slug);
        if (app == null)
            return ApiResponse.notFound("Service not found").toResponseEntity();
        if (!app.isOAuth2() || app.getOAuth2Handler() == null)
            return ApiResponse.badRequest("Service is not OAuth2, you can't call this").toResponseEntity();
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(slug);
        if (clientRegistration == null)
            return ApiResponse.internalServerError("Service OAuth2 is not configure").toResponseEntity();

        String authorizationUri = clientRegistration.getProviderDetails().getAuthorizationUri();
        String clientId = clientRegistration.getClientId();
        // This is the redirect uri set in the application.properties
        // We need this for indicate to the OAuth2 app where to redirect after the authorization (callback)
        String defaultRedirectUri = clientRegistration.getRedirectUri();
        Set<String> scope = clientRegistration.getScopes();
        String state = app.getOAuth2Handler().getState();
        state += "-" + userId;

        // This part is for redirect when process is done (check callbackOAuth2App)
        String redirectUriFinal = redirectUri != null ? redirectUri : defaultRedirectUri;
        redirectUris.put(userId, redirectUriFinal);

        // Here we set defaultRedirectUri because we need to redirect to the callback after the authorization
        return ResponseEntity.status(302).location(
            app.getOAuth2Handler().getOAuth2AuthorizationUri(authorizationUri, clientId, defaultRedirectUri, state, scope)
        ).build();
    }

    /**
     * Callback of the OAuth2 app (called by the app)
     * @param slug the slug of the app
     * @param code the code given by the app
     * @param state the state given by the app
     * @param error the error given by the app
     * @return a response entity with the redirection
     * @throws DataNotFoundException if the app is not found
     */
    public ResponseEntity<ApiResponse<String>> callbackOAuth2App(String slug, String code, String state, String error) throws DataNotFoundException {
        App app = getApp(slug);
        if (app == null)
            return ApiResponse.notFound("Service not found").toResponseEntity();
        if (!app.isOAuth2() || app.getOAuth2Handler() == null)
            return ApiResponse.badRequest("Service is not OAuth2, you can't call this").toResponseEntity();
        if (!app.getOAuth2Handler().isStateValid(state.split("-")[0]))
            return ApiResponse.badRequest("State is not valid").toResponseEntity();

        String redirectUri = redirectUris.get(Long.parseLong(state.split("-")[1]));
        if (redirectUri == null)
            return ApiResponse.badRequest("Redirect uri is not valid").toResponseEntity();
        redirectUris.remove(Long.parseLong(state.split("-")[1]));

        if (error != null) {
            return ResponseEntity.status(302).location(URI.create(redirectUri)).build();
        }

        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(slug);
        if (clientRegistration == null)
            return ApiResponse.internalServerError("Service OAuth2 is not configure").toResponseEntity();

        String tokenUrl = clientRegistration.getProviderDetails().getTokenUri();
        String clientId = clientRegistration.getClientId();
        String clientSecret = clientRegistration.getClientSecret();
        String defaultRedirectUri = clientRegistration.getRedirectUri();

        // We need to give a redirect Uri (I don't know why, because token result is the return of this request) so we give the default one
        MultiValueMap<String, String> body = app.getOAuth2Handler().getBody(code, clientId, clientSecret, defaultRedirectUri);
        String token = app.getOAuth2Handler().getToken(tokenUrl, body);
        long userId = Long.parseLong(state.split("-")[1]);

        User user = userService.getUser(userId);
        if (user == null)
            throw new DataNotFoundException("User not found");
        user.addConnectedService(new ConnectedService(slug, token));
        userService.save(user);

        return ResponseEntity.status(302).location(URI.create(redirectUri)).build();
    }

    public boolean deleteOAuth2(String slug) throws DataNotFoundException {
        User user = userService.getCurrentUser();
        if (user.getConnectedService(slug) == null) {
            throw new DataNotFoundException("User is not connected to this service");
        }
        user.removeConnectedService(slug);
        return true;
    }

}
