package fr.zertus.area.security.oauth2;

import fr.zertus.area.entity.ConnectedService;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URI;
import java.util.Set;

public abstract class OAuth2CodeAuthorizationHandler {

    /**
     * Get default body for OAuth2 authorization code
     * @param code authorization code
     * @param clientId client id
     * @param clientSecret client secret
     * @param redirectUri redirect uri
     * @return body
     */
    public MultiValueMap<String, String> getBody(String code, String clientId, String clientSecret, String redirectUri) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", code);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", redirectUri);
        return body;
    }

    public abstract ConnectedService getToken(String token, MultiValueMap<String, String> body);

    public ConnectedService refreshToken(ConnectedService service, MultiValueMap<String, String> body) {
        return null;
    }

    public abstract String getState();

    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, Set<String> scope) {
        return URI.create(authorizationUri +
            "?client_id=" + clientId +
            "&redirect_uri=" + redirectUri +
            "&scope=" + String.join("%20", scope) +
            "&state=" + state
        );
    }

    public boolean isStateValid(String state) {
        return state.equals(getState());
    }

    public abstract String getClientRegistrationId();

}
