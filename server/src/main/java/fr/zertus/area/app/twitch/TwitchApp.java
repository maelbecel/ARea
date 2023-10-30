package fr.zertus.area.app.twitch;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.twitch.action.TwitchNewFollowerAction;
import fr.zertus.area.app.twitch.action.TwitchNewSubscriberAction;
import fr.zertus.area.app.twitch.action.TwitchStreamStartAction;
import fr.zertus.area.app.twitch.model.TwitchAppToken;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.IPGetter;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class TwitchApp extends App {

    private static final OAuth2CodeAuthorizationHandler handler = new TwitchOAuth2Handler();

    @Override
    public String getName() {
        return "Twitch";
    }

    @Override
    public String getSlug() {
        return "twitch";
    }

    @Override
    public List<Action> getActions() {
        return List.of(
            new TwitchStreamStartAction(getName()),
            new TwitchNewFollowerAction(getName()),
            new TwitchNewSubscriberAction(getName())
        );
    }

    @Override
    public List<Reaction> getReactions() {
        return null;
    }

    @Override
    public boolean isOAuth2() {
        return true;
    }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return handler;
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/twitch/image", "#A970FF",
            "Twitch is the world’s leading social video platform and community for gamers, video game culture, and the creative arts. Turn on Applets to grow your Twitch audience, and keep up with your favorite broadcasters' videos and livestreams.",
            "https://www.twitch.tv/");
    }


    // APP TOKEN FOR TWITCH REQUESTS
    private static TwitchAppToken appToken = null;
    private static ClientRegistrationRepository clientRegistrationRepository = null;

    public static TwitchAppToken getAppToken() {
        if (appToken == null || (appToken.getCreated_at() + appToken.getExpires_in() < System.currentTimeMillis())) {
            ClientRegistration twitch = clientRegistrationRepository.findByRegistrationId("twitch");
            String clientId = twitch.getClientId();
            String clientSecret = twitch.getClientSecret();

            try {
                String body = "client_id=" + clientId + "&client_secret=" + clientSecret + "&grant_type=client_credentials";
                ApiResponse<TwitchAppToken> response = BasicApiClient.sendPostRequest("https://id.twitch.tv/oauth2/token", body, TwitchAppToken.class,
                    Map.of("Content-Type", "application/x-www-form-urlencoded"));

                if (response.getStatus() != 200)
                    return null;
                appToken = response.getData();
                appToken.setCreated_at(System.currentTimeMillis());
                appToken.setClientId(clientId);
            } catch (Exception e) {
                return null;
            }
        }

        return appToken;
    }

    @Autowired
    public void setClientRegistrationRepository(ClientRegistrationRepository clientRegistrationRepository) {
        TwitchApp.clientRegistrationRepository = clientRegistrationRepository;
    }


}
