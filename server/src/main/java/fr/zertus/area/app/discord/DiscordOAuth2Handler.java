package fr.zertus.area.app.discord;

import fr.zertus.area.app.github.GithubOAuth2Handler;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.Set;


public class DiscordOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    private static final Logger logger = LoggerFactory.getLogger(DiscordOAuth2Handler.class);

    @Override
    public String getToken(String tokenUrl, MultiValueMap<String, String> body) {

        logger.debug("abcdefghijklmnop");

        RestTemplate restTemplate = new RestTemplate();

        // Create HttpHeaders and set custom headers
        HttpHeaders headers = new HttpHeaders();
        // headers.add("Authorization", "Bearer YOUR_ACCESS_TOKEN");
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Set content type to application/x-www-form-urlencoded


        // Create a HttpEntity with the headers and body
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        // Perform the POST request with the custom headers
        ResponseEntity<DiscordOAuth2Token> responseEntity = restTemplate.exchange(
                tokenUrl,
                HttpMethod.POST,
                requestEntity,
                DiscordOAuth2Token.class
        );

        // Check the response and handle it accordingly
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            DiscordOAuth2Token token = responseEntity.getBody();
            if (token == null || token.getAccess_token() == null)
                return null;
            return token.getAccess_token();
        } else {
            // Handle error response
            System.err.println("Error: " + responseEntity.getStatusCode());
            return null;
        }
    };

    @Override
    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, long userId, Set<String> scope) {
        return URI.create(authorizationUri +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&scope=" + String.join("%20", scope) +
                "&state=" + state + "-" + userId +
                "&response_type=" + "code" +
                "&prompt=" + "consent"
        );
    }

    @Override
    public String getState() {
        return "J4doreM4angerDesraviolisM4sansBeurredeCacahuEteDonVoilactop#vivalavida";
    };

    /* here is the response that we will receive and convert into this object */
    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class DiscordOAuth2Token {
        String access_token;
        String token_type;
        String scope;
    }
}