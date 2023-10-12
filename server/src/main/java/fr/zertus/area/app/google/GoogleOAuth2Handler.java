package fr.zertus.area.app.google;

import fr.zertus.area.app.spotify.SpotifyOAuth2Handler;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Set;

public class GoogleOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    @Override
    public String getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Set content type to application/x-www-form-urlencoded

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<GoogleOAuth2Token> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, GoogleOAuth2Token.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            GoogleOAuth2Token token = responseEntity.getBody();
            if (token == null || token.getAccess_token() == null)
                return null;
            return token.getAccess_token();
        } else {
            System.err.println("Error: " + responseEntity.getStatusCode());
            return null;
        }
    }

    @Override
    public String getState() {
        return "sqkfigsigohraihahzrghzhatrtgrpi13456YTGFSDFA43565UTHyzerahrtçgufji";
    }

    @Override
    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, Set<String> scope) {
        return URI.create(authorizationUri +
            "?client_id=" + clientId +
            "&redirect_uri=" + redirectUri +
            "&scope=" + String.join("%20", scope) +
            "&state=" + state +
            "&response_type=code" +
            "&access_type=offline" +
            "&include_granted_scopes=true"
        );
    }

    @Data
    public static class GoogleOAuth2Token {
        private String access_token;
        private String refresh_token;
        private String scope;
        private String token_type;
        private int expires_in;
    }

}
