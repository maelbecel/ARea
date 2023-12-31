package fr.zertus.area.app.github;

import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class GithubOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();
        GithubOAuth2Token token = restTemplate.postForObject(tokenUrl, body, GithubOAuth2Token.class);
        if (token == null || token.getAccess_token() == null)
            return null;
        return new ConnectedService("github", token.getAccess_token(), null, null, 0, System.currentTimeMillis());
    }

    @Override
    public String getState() {
        return "42jador3l3audans2030ans1ly3nauraplussaufs1j3mang3monp13dd3vantunf1lmavecun3p1zzaaup3p3ron1p3ndantqu3chant3doral3xploratr1c3";
    }

    @Override
    public String getClientRegistrationId() {
        return "github";
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class GithubOAuth2Token {
        String access_token;
        String token_type;
        String scope;
    }

}
