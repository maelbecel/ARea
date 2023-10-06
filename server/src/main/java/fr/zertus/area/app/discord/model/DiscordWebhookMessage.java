package fr.zertus.area.app.discord.model;

import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.io.IOException;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
public class DiscordWebhookMessage {

    String content;
    String username;
    String avatar_url;

    public boolean send(String webhook) {
        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(webhook, this, String.class);
            return response.getStatus() >= 200 && response.getStatus() < 300;
        } catch (IOException e) {
            return false;
        }
    }

}
