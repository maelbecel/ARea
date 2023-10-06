package fr.zertus.area.app.twitch.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class TwitchAppToken {

    String access_token;
    long expires_in;
    long created_at;
    String clientId;

}
