package fr.zertus.area.app.twitch.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class TwitchSubscriptionResponse {

    List<Response> data;

    String total;
    String total_cost;
    String max_total_cost;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Response {
        String id;
        String status;
        String type;
        String cost;
    }

}
