package fr.zertus.area.app.youtube.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.spotify.SpotifyOAuth2Handler;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class YoutubeNewVideoAction extends Action {

    public YoutubeNewVideoAction(String appName) {
        super(appName, "New video", "New video on a channel");

        this.inputs.add(FormInput.createTextInput("channel_id", "Channel ID"));

        this.placeholders.put("video_title", "Video title");
        this.placeholders.put("channel_name", "Channel name");
        this.placeholders.put("video_url", "Video URL");
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        String channelId = FormInputUtils.getValue("channel_id", inputs);
        String url = "https://pubsubhubbub.appspot.com/subscribe";

        RestTemplate restTemplate = new RestTemplate();
        String body = "hub.callback=https://area51.zertus.fr/webhook/youtube&hub.topic=https%3A%2F%2Fwww.youtube.com%2Fxml%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D" + channelId + "&hub.verify=sync&hub.mode=subscribe";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED); // Set content type to application/x-www-form-urlencoded
        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful())
                return;
            throw new ActionTriggerException("Error while subscribing to the channel");
        } catch (Exception e) {
            throw new ActionTriggerException("HTTP error: " + e.getMessage());
        }
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        String channelId = values.get("channel_id");
        String channelIdInput = FormInputUtils.getValue("channel_id", inputs);
        return channelId.equals(channelIdInput);
    }

}
