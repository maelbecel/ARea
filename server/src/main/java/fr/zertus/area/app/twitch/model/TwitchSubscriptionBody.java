package fr.zertus.area.app.twitch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
public class TwitchSubscriptionBody {

    String type;
    String version;
    Condition condition;
    Transport transport;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    @AllArgsConstructor
    public static class Condition {
        String broadcaster_user_id;
        String moderator_user_id;

        public Condition(String broadcaster_user_id) {
            this.broadcaster_user_id = broadcaster_user_id;
            this.moderator_user_id = broadcaster_user_id;
        }
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    @AllArgsConstructor
    public static class Transport {
        String method;
        String callback;
        String secret;
    }

}
