package fr.zertus.area.service;

import fr.zertus.area.app.App;
import fr.zertus.area.app.area51.Area51App;
import fr.zertus.area.app.discord.DiscordApp;
import fr.zertus.area.app.github.GithubApp;
import fr.zertus.area.app.gmail.GmailApp;
import fr.zertus.area.app.google.GoogleApp;
import fr.zertus.area.app.notion.NotionApp;
import fr.zertus.area.app.spotify.SpotifyApp;
import fr.zertus.area.app.time.TimeApp;
import fr.zertus.area.app.twitch.TwitchApp;
import fr.zertus.area.app.weather.WeatherApp;
import fr.zertus.area.app.youtube.YoutubeApp;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private RegisterUserService registerUserService;

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

        YoutubeApp youtubeApp = new YoutubeApp();
        apps.put(youtubeApp.getSlug(), youtubeApp);

        GmailApp gmailApp = new GmailApp();
        apps.put(gmailApp.getSlug(), gmailApp);

        WeatherApp weatherApp = new WeatherApp();
        apps.put(weatherApp.getSlug(), weatherApp);

        TimeApp timeApp = new TimeApp();
        apps.put(timeApp.getSlug(), timeApp);

        Area51App area51App = new Area51App();
        apps.put(area51App.getSlug(), area51App);
    }

    private static final Map<Long, String> redirectUris = new HashMap<>();

    public App getApp(String slug) {
        return apps.get(slug);
    }

    public List<App> getApps() {
        List<App> tmp = new ArrayList<>(apps.values());
        tmp.remove(apps.get("google")); // Google is not an app, it's a group of apps, maybe I will change this later
        return tmp;
    }

    /**
     * Redirect to the OAuth2 app
     * @param slug the slug of the app
     * @return a response entity with the redirection
     * @throws DataNotFoundException if the app is not found
     */
    public ResponseEntity<ApiResponse<String>> redirectOAuth2App(String slug, long userId, String redirectUri) {
        return redirectOAuth2App(slug, userId, redirectUri, false);
    }

    public ResponseEntity<ApiResponse<String>> redirectOAuth2App(String slug, Long userId, String redirectUri, boolean userLogin) {
        App app = getApp(slug);
        if (app == null)
            return ApiResponse.notFound("Service not found").toResponseEntity();
        if (!app.isOAuth2() || app.getOAuth2Handler() == null)
            return ApiResponse.badRequest("Service is not OAuth2, you can't call this").toResponseEntity();
        String clientRegistrationId = app.getOAuth2Handler().getClientRegistrationId();
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(clientRegistrationId);
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

        if (userLogin) {
            state += "-login";
        }

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
            return ResponseEntity.status(302).location(URI.create(redirectUri + "?error=" + error)).build();
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
        ConnectedService connectedService = app.getOAuth2Handler().getToken(tokenUrl, body);

        if (state.split("-").length == 3) {
            String url = registerUserService.registerLoginUserByGoogle(connectedService, redirectUri);
            return ResponseEntity.status(302).location(URI.create(url)).build();
        }

        long userId = Long.parseLong(state.split("-")[1]);

        User user = userService.getUser(userId);
        if (user == null)
            throw new DataNotFoundException("User not found");
        user.addConnectedService(connectedService);
        if (connectedService.getSlug().equals("google")) {
            user.addConnectedService(new ConnectedService("gmail", connectedService.getToken(), connectedService.getData(), connectedService.getRefreshToken(), connectedService.getExpiration(), connectedService.getTokenDate()));
            user.addConnectedService(new ConnectedService("youtube", connectedService.getToken(), connectedService.getData(), connectedService.getRefreshToken(), connectedService.getExpiration(), connectedService.getTokenDate()));
        }
        userService.save(user);

        return ResponseEntity.status(302).location(URI.create(redirectUri)).build();
    }

    public MultiValueMap<String, String> getTokenRequestsBodyFor(String slug) {
        App app = getApp(slug);
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(slug);
        if (clientRegistration == null)
            return null;

        String clientId = clientRegistration.getClientId();
        String clientSecret = clientRegistration.getClientSecret();
        String defaultRedirectUri = clientRegistration.getRedirectUri();

        // We need to give a redirect Uri (I don't know why, because token result is the return of this request) so we give the default one
        return app.getOAuth2Handler().getBody("", clientId, clientSecret, defaultRedirectUri);
    }

    public boolean deleteOAuth2(String slug) throws DataNotFoundException {
        User user = userService.getCurrentUser();
        if (user.getConnectedService(slug) == null) {
            throw new DataNotFoundException("User is not connected to this service");
        }
        user.removeConnectedService(slug);
        userService.save(user);
        return true;
    }

}
