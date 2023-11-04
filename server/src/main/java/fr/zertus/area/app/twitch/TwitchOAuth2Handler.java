package fr.zertus.area.app.twitch;

import fr.zertus.area.app.github.GithubOAuth2Handler;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.BasicApiClient;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Map;
import java.util.Set;

public class TwitchOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();
        TwitchOAuth2Token token = restTemplate.postForObject(tokenUrl, body, TwitchOAuth2Token.class);
        if (token == null || token.getAccess_token() == null)
            return null;
        return new ConnectedService("twitch", token.getAccess_token(), null, token.getRefresh_token(), token.getExpires_in(), System.currentTimeMillis());
    }

    @Override
    public ConnectedService refreshToken(ConnectedService service, MultiValueMap<String, String> body) {
        String bodyXml = "grant_type=refresh_token&refresh_token=" + service.getRefreshToken() +
            "&client_id=" + body.getFirst("client_id") +
            "&client_secret=" + body.getFirst("client_secret");
        String url = "https://id.twitch.tv/oauth2/token";

        try {
            ApiResponse<TwitchOAuth2Token> response = BasicApiClient.sendPostRequest(url, bodyXml, TwitchOAuth2Token.class, Map.of(
                "Content-Type", "application/x-www-form-urlencoded"
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                return null;
            return new ConnectedService("twitch", response.getData().getAccess_token(), null, response.getData().getRefresh_token(), response.getData().getExpires_in(), System.currentTimeMillis());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public String getState() {
        return "dsqfghfjggdfsqflkngndsfnqjdnjgsfbjlefqjpfbifbheqpvijUHEFARQHPIFezyqogrbq_AEFHGSBVIEJfuhgrtbupiejfrhvbqpcijEDFRHVQBUpecijdfrhvqfbcuhfyvfhb";
    }

    @Override
    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, Set<String> scope) {
        return URI.create(authorizationUri +
            "?client_id=" + clientId +
            "&redirect_uri=" + redirectUri +
            "&scope=" + String.join("%20", scope) +
            "&state=" + state +
            "&response_type=code"
        );
    }

    @Override
    public String getClientRegistrationId() {
        return "twitch";
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class TwitchOAuth2Token {
        String access_token;
        String token_type;
        long expires_in;
        String refresh_token;
    }

}
