package fr.zertus.area.app.google;

import com.google.gson.Gson;
import fr.zertus.area.app.google.model.GoogleUserInfo;
import fr.zertus.area.app.spotify.SpotifyOAuth2Handler;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.BasicApiClient;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Map;
import java.util.Set;

public class GoogleOAuth2Handler extends OAuth2CodeAuthorizationHandler {

    @Override
    public ConnectedService getToken(String tokenUrl, MultiValueMap<String, String> body) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Set content type to application/x-www-form-urlencoded

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<GoogleOAuth2Token> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, GoogleOAuth2Token.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            GoogleOAuth2Token token = responseEntity.getBody();
            if (token == null || token.getAccess_token() == null)
                return null;
            try {
                ApiResponse<GoogleUserInfo> userInfo = BasicApiClient.sendGetRequest("https://openidconnect.googleapis.com/v1/userinfo", GoogleUserInfo.class,
                    Map.of("Authorization", "Bearer " + token.getAccess_token()));

                if (userInfo.getData() == null)
                    return new ConnectedService("google", token.getAccess_token(), null);
                return new ConnectedService("google", token.getAccess_token(), new Gson().toJson(userInfo.getData()));
            } catch (Exception e) {
                return new ConnectedService("google", token.getAccess_token(), null);
            }
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
    public String getClientRegistrationId() {
        return "google";
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
    private static class GoogleOAuth2Token {
        private String access_token;
        private String refresh_token;
        private String scope;
        private String token_type;
        private int expires_in;
    }

}
