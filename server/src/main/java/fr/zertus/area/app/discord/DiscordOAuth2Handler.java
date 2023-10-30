package fr.zertus.area.app.discord;

import fr.zertus.area.app.github.GithubOAuth2Handler;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.Base64;
import java.util.Map;
import java.util.Set;


public class DiscordOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    private static final Logger logger = LoggerFactory.getLogger(DiscordOAuth2Handler.class);

    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Set content type to application/x-www-form-urlencoded
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<DiscordOAuth2Token> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, DiscordOAuth2Token.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            DiscordOAuth2Token token = responseEntity.getBody();
            if (token == null || token.getAccess_token() == null)
                return null;
            return new ConnectedService("discord", token.getAccess_token(), null, token.getRefresh_token(), token.getExpires_in(), System.currentTimeMillis());
        } else {
            System.err.println("Error: " + responseEntity.getStatusCode());
            return null;
        }
    };

    @Override
    public ConnectedService refreshToken(ConnectedService service, MultiValueMap<String, String> body) {
        String bodyXml = "grant_type=refresh_token&refresh_token=" + service.getRefreshToken();
        String url = "https://discord.com/api/oauth2/token";

        try {
            ApiResponse<DiscordOAuth2Token> response = BasicApiClient.sendPostRequest(url, bodyXml, DiscordOAuth2Token.class, Map.of(
                "Authorization", "Basic " + Base64.getEncoder().encodeToString("CLIENT_ID:CLIENT_SECRET".getBytes()),
                "Content-Type", "application/x-www-form-urlencoded"
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300) {
                logger.error("Error while refreshing token for service");
                return null;
            }
            return new ConnectedService("discord", response.getData().getAccess_token(), null, response.getData().getRefresh_token(), response.getData().getExpires_in(), System.currentTimeMillis());
        } catch (Exception e) {
            logger.error("Error while refreshing token for service");
            return null;
        }
    }

    @Override
    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, Set<String> scope) {
        return URI.create(authorizationUri +
                "?response_type=code" +
                "&client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&scope=" + String.join("%20", scope) +
                "&state=" + state +
                "&prompt=" + "consent"
        );
    }

    @Override
    public String getState() {
        return "J4doreM4angerDesraviolisM4sansBeurredeCacahuEteDonVoilactop";
    };

    @Override
    public String getClientRegistrationId() {
        return "discord";
    }

    /* here is the response that we will receive and convert into this object */
    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class DiscordOAuth2Token {
        String access_token;
        String token_type;
        String scope;
        long expires_in;
        String refresh_token;
    }
}