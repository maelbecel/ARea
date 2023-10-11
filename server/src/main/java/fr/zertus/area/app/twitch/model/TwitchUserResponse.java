package fr.zertus.area.app.twitch.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class TwitchUserResponse {

    List<TwitchUserData> data;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class TwitchUserData {
        String id;
        String login;
        String display_name;
        String type;
        String broadcaster_type;
        String description;
        String profile_image_url;
        String offline_image_url;
        int view_count;
        String email;
        String created_at;
    }

}
