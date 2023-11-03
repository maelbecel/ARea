package fr.zertus.area.app.discord.model;

import com.google.gson.Gson;
import fr.zertus.area.exception.ReactionTriggerException;
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
    Embed embed;

    public DiscordWebhookMessage(String content, String username, String avatar_url) {
        this.content = content;
        this.username = username;
        this.avatar_url = avatar_url;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    @AllArgsConstructor
    public static class Embed {
        String title;
        String description;
        String url;
        long color;
        String timestamp;
        Footer footer;
        Image image;
        Image thumbnail;
        Author author;
    }

    @Data
    @AllArgsConstructor
    public static class Footer {
        private String text;
        private String icon_url;
    }

    @Data
    @AllArgsConstructor
    public static class Image {
        String url;
    }

    @Data
    @AllArgsConstructor
    public static class Author {
        String name;
        String url;
        String icon_url;
    }

    public boolean send(String webhook) throws ReactionTriggerException {
        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(webhook, this, String.class);
            if (response.getStatus() >= 200 && response.getStatus() < 300)
                return true;
            else
                throw new ReactionTriggerException("Failed to send message to discord webhook");
        } catch (IOException e) {
            throw new ReactionTriggerException("Failed to send message to discord webhook");
        }
    }

}
