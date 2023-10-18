package fr.zertus.area.app.notion;

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
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class NotionOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    @Override
    public URI getOAuth2AuthorizationUri(String authorizationUri, String clientId, String redirectUri, String state, Set<String> scope) {
        return URI.create(authorizationUri +
            "?client_id=" + clientId +
            "&response_type=code" +
            "&owner=user" +
            "&redirect_uri=" + redirectUri +
            "&state=" + state
        );
    }

    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String authToken = body.getFirst("client_id") + ":" + body.getFirst("client_secret");
        String encodedAuthToken = Base64.getEncoder().encodeToString(authToken.getBytes());
        headers.setBasicAuth(encodedAuthToken);

        Map<String, String> newBody = new HashMap<>();
        newBody.put("grant_type", "authorization_code");
        newBody.put("code", body.getFirst("code"));
        newBody.put("redirect_uri", body.getFirst("redirect_uri"));
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(newBody, headers);

        ResponseEntity<NotionOAuth2Token> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, NotionOAuth2Token.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            NotionOAuth2Token token = responseEntity.getBody();
            if (token == null || token.getAccess_token() == null)
                return null;
            return new ConnectedService("notion", token.getAccess_token(), null);
        } else {
            System.err.println("Error: " + responseEntity.getStatusCode());
            return null;
        }
    }

    @Override
    public String getState() {
        return "fdshgqjlbgrzqbjEARBJI23fdnjgsbjjefbjebjehbegrhkvzhvezUOT4894U38FGLJZalbjgqobARZ3";
    }

    @Data
    public static class NotionOAuth2Token {
        private String access_token;
        private String token_type;
        private String workspace_name;
        private String workspace_icon;
        private String bot_id;
        private String bot_name;
        private String bot_icon;
    }

}
