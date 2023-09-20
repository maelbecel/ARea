package fr.zertus.area.security.oauth2;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

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

    public abstract String getToken(String token, MultiValueMap<String, String> body);

    public abstract String getState();

    public boolean isStateValid(String state) {
        return state.equals(getState());
    }

}
