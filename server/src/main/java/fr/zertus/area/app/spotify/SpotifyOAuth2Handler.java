package fr.zertus.area.app.spotify;

import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Base64;
import java.util.Set;

public class SpotifyOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Set content type to application/x-www-form-urlencoded
        String authToken = body.getFirst("client_id") + ":" + body.getFirst("client_secret");
        String encodedAuthToken = Base64.getEncoder().encodeToString(authToken.getBytes());
        headers.setBasicAuth(encodedAuthToken);
        body.remove("client_secret");
        body.remove("client_id");
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<SpotifyOAuth2Token> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, SpotifyOAuth2Token.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            SpotifyOAuth2Token token = responseEntity.getBody();
            if (token == null || token.getAccess_token() == null)
                return null;
            return new ConnectedService("spotify", token.getAccess_token(), null);
        } else {
            System.err.println("Error: " + responseEntity.getStatusCode());
            return null;
        }
    }

    @Override
    public String getState() {
        return "csqnvdslnjfqkbjgsqlbjfqbhlg1246hlEQHOBEFAobuhga21z1ouhur";
    }

    @Override
    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, Set<String> scope) {
        return URI.create(authorizationUri +
            "?client_id=" + clientId +
            "&response_type=code" +
            "&redirect_uri=" + redirectUri +
            "&scope=" + String.join("%20", scope) +
            "&state=" + state
        );
    }

    @Override
    public String getClientRegistrationId() {
        return "spotify";
    }

    @Data
    public static class SpotifyOAuth2Token {
        private String access_token;
        private String token_type;
        private String scope;
        private int expires_in;
        private String refresh_token;
    }

}
