package fr.zertus.area.controller;

import fr.zertus.area.app.App;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import fr.zertus.area.service.AppService;
import fr.zertus.area.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/service")
public class AppController {

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Autowired
    private AppService appService;

    @Autowired
    private UserService userService;

    @GetMapping("{slug}/oauth2")
    public ResponseEntity<ApiResponse<String>> redirectToOauth2(@PathVariable String slug) {
        App app = appService.getApp(slug);
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

        return ResponseEntity.status(302).location(
            URI.create(authorizationUri +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&scope=" + String.join(" ", scope) +
                "&state=" + state
            )
        ).build();
    }

    @GetMapping("{slug}/callback")
    public ResponseEntity<ApiResponse<String>> handleOAuth2Callback(@PathVariable String slug, @RequestParam(required = false) String error,
                                                                    @RequestParam(required = false) String code, @RequestParam String state) throws IllegalAccessException {
        App app = appService.getApp(slug);
        if (app == null)
            return ApiResponse.notFound("Service not found").toResponseEntity();
        if (!app.isOAuth2() || app.getOAuth2Handler() == null)
            return ApiResponse.badRequest("Service is not OAuth2, you can't call this").toResponseEntity();
        if (!app.getOAuth2Handler().isStateValid(state))
            return ApiResponse.badRequest("State is not valid").toResponseEntity();
        if (error != null) {
            return ResponseEntity.status(302).location(URI.create("https://github.com")).build();
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

        try {
            userService.addConnectedServiceToUser(new ConnectedService(app.getSlug(), token));
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            throw new IllegalAccessException("Invalid token");
        }

        return ResponseEntity.status(302).location(URI.create("https://github.com")).build();
    }

}
