package fr.zertus.area.service;

import fr.zertus.area.app.App;
import fr.zertus.area.app.discord.DiscordApp;
import fr.zertus.area.app.github.GithubApp;
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

        DiscordApp discordApp = new DiscordApp();
        apps.put(discordApp.getSlug(), discordApp);
    }

    @Value("${oauth2.web.redirect-uri}")
    private String webRedirectUri;

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
    public ResponseEntity<ApiResponse<String>> redirectOAuth2App(String slug, Long userId, String mobileRedirect) throws DataNotFoundException {
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
        String redirectUri = clientRegistration.getRedirectUri();
        Set<String> scope = clientRegistration.getScopes();
        String state = app.getOAuth2Handler().getState();
        state += "-" + userId;

        if (mobileRedirect != null) {
            state += "-" + mobileRedirect;
        }

        return ResponseEntity.status(302).location(
            app.getOAuth2Handler().getOAuth2AuthorizationUri(authorizationUri, clientId, redirectUri, state, scope)
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
    public ResponseEntity<ApiResponse<String>> callbackOAuth2App(String slug, String code, String state, String error, Boolean fromMobile) throws DataNotFoundException {
        App app = getApp(slug);
        if (app == null)
            return ApiResponse.notFound("Service not found").toResponseEntity();
        if (!app.isOAuth2() || app.getOAuth2Handler() == null)
            return ApiResponse.badRequest("Service is not OAuth2, you can't call this").toResponseEntity();
        if (!app.getOAuth2Handler().isStateValid(state.split("-")[0]))
            return ApiResponse.badRequest("State is not valid").toResponseEntity();

        String mobileRedirectUri = null;
        if (fromMobile != null && fromMobile) {
            mobileRedirectUri = state.split("-")[2];
        }

        if (error != null) {
            if (fromMobile != null && fromMobile)
                return ResponseEntity.status(302).location(URI.create(mobileRedirectUri)).build();
            return ResponseEntity.status(302).location(URI.create(webRedirectUri)).build();
        }

        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(slug);
        if (clientRegistration == null)
            return ApiResponse.internalServerError("Service OAuth2 is not configure").toResponseEntity();

        String tokenUrl = clientRegistration.getProviderDetails().getTokenUri();
        String clientId = clientRegistration.getClientId();
        String clientSecret = clientRegistration.getClientSecret();
        String redirectUri = clientRegistration.getRedirectUri();

        MultiValueMap<String, String> body = app.getOAuth2Handler().getBody(code, clientId, clientSecret, redirectUri);
        String token = app.getOAuth2Handler().getToken(tokenUrl, body);
        long userId = Long.parseLong(state.split("-")[1]);

        User user = userService.getUser(userId);
        if (user == null)
            throw new DataNotFoundException("User not found");
        user.addConnectedService(new ConnectedService(slug, token));
        userService.save(user);

        if (fromMobile != null && fromMobile)
            return ResponseEntity.status(302).location(URI.create(mobileRedirectUri)).build();
        return ResponseEntity.status(302).location(URI.create(webRedirectUri)).build();
    }

}
