package fr.zertus.area.app.twitch.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.twitch.TwitchApp;
import fr.zertus.area.app.twitch.model.TwitchAppToken;
import fr.zertus.area.app.twitch.model.TwitchSubscriptionBody;
import fr.zertus.area.app.twitch.model.TwitchUserResponse;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import fr.zertus.area.utils.StringUtils;

import java.util.List;
import java.util.Map;

public class TwitchStreamStartAction extends Action {

    public TwitchStreamStartAction(String app) {
        super(app, "One stream start", "New stream start on defined channel");

        this.inputs.add(FormInput.createTextInput("channel", "Channel name"));

        this.placeholders.put("channel", "Channel name");;
        this.placeholders.put("started_at", "Stream start date");
        this.placeholders.put("link", "Stream link");
    }

    @Override
    public List<FormInput> getInputs(User user) {
        return super.getInputs(user);
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        if (!userExist(inputs))
            throw new ActionTriggerException("Channel not found");

        // Create subscription
        String serverUrl = System.getenv("SERVER_BASE_URL") != null ? System.getenv("SERVER_BASE_URL") : "https://area51.zertus.fr";
        TwitchSubscriptionBody twitchSubscriptionBody = new TwitchSubscriptionBody(
            "stream.online",
            "1",
            new TwitchSubscriptionBody.Condition(FormInputUtils.getValue("channel_id", inputs)),
            new TwitchSubscriptionBody.Transport("webhook", serverUrl + "/webhook/twitch", "StateForUserWebhook")
        );
        try {
            TwitchAppToken appToken = TwitchApp.getAppToken();
            if (appToken == null)
                throw new ActionTriggerException("Twitch app token is null");
            ApiResponse<String> response = BasicApiClient.sendPostRequest("https://api.twitch.tv/helix/eventsub/subscriptions", twitchSubscriptionBody, String.class,
                Map.of("Authorization", "Bearer " + appToken.getAccess_token(), "Client-Id", appToken.getClientId()));

            if (response.getStatus() == 401 || response.getStatus() == 403) {
                throw new ActionTriggerException("Fail to connect to Twitch - User is not connected to Twitch");
            }
            if (response.getStatus() == 409) {
                return;
            }
            if (response.getData() == null)
                throw new DataNotFoundException("Fail to create subscription - No data ?" + response.getStatus() + " - " + response.getMessage());
            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ActionTriggerException("Fail to create subscription - " + response.getStatus() + " - " + response.getData() + " - " + twitchSubscriptionBody.getCondition().getBroadcaster_user_id());
        } catch (Exception e) {
            throw new ActionTriggerException("Fail to create subscription: " + e.getMessage());
        }
    }

    private boolean userExist(List<FormInput> inputs) throws ActionTriggerException {
        TwitchAppToken appToken = TwitchApp.getAppToken();
        if (appToken == null)
            throw new ActionTriggerException("Twitch app token is null");

        String channel_name = FormInputUtils.getValue("channel", inputs);
        channel_name = StringUtils.slugify(channel_name);
        try {
            ApiResponse<TwitchUserResponse> response = BasicApiClient.sendGetRequest("https://api.twitch.tv/helix/users?login=" + channel_name, TwitchUserResponse.class,
                Map.of("Authorization", "Bearer " + appToken.getAccess_token(), "Client-Id", appToken.getClientId()));

            if (response.getStatus() == 401 || response.getStatus() == 403) {
                throw new ActionTriggerException("Fail to get user - User is not connected to Twitch");
            }
            if (response.getData() == null || response.getData().getData() == null || response.getData().getData().isEmpty())
                throw new ActionTriggerException("Channel not found");
            inputs.add(FormInput.createHiddenInput("channel_id", "Channel ID", response.getData().getData().get(0).getId()));
        } catch (Exception e) {
            throw new ActionTriggerException("Channel not found");
        }
        return true;
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        Long channel_id = Long.parseLong(FormInputUtils.getValue("channel_id", inputs));
        Long broadcaster_user_id = Long.parseLong(values.get("broadcaster_user_id"));

        return channel_id.equals(broadcaster_user_id);
    }

}
