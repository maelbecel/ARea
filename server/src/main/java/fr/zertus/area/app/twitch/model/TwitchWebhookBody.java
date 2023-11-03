package fr.zertus.area.app.twitch.model;

import lombok.Data;

@Data
public class TwitchWebhookBody {

    private String challenge;
    private Subscription subscription;
    private Event event;

    @Data
    public static class Subscription {
        private String id;
        private String status;
        private String type;
        private String version;
        private String cost;
        private Condition condition;
        private Transport transport;
        private String created_at;

        @Data
        public static class Transport {
            private String method;
            private String callback;
        }

        @Data
        public static class Condition {
            private String broadcaster_user_id;
        }
    }

    @Data
    public static class Event {
        private String id;
        private String user_name;
        private String broadcaster_user_id;
        private String broadcaster_user_login;
        private String broadcaster_user_name;
        private String type;
        private String started_at;
        private String tier;
    }

}
