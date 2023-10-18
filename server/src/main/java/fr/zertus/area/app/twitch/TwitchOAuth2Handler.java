package fr.zertus.area.app.twitch;

import fr.zertus.area.app.github.GithubOAuth2Handler;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Set;

public class TwitchOAuth2Handler extends OAuth2CodeAuthorizationHandler {



    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();
        TwitchOAuth2Token token = restTemplate.postForObject(tokenUrl, body, TwitchOAuth2Token.class);
        if (token == null || token.getAccess_token() == null)
            return null;
        return new ConnectedService("twitch", token.getAccess_token(), null);
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

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class TwitchOAuth2Token {
        String access_token;
        String token_type;
    }

}
