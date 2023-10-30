package fr.zertus.area.app.spotify.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SpotifyPlaylist {

    String name;
    String id;
    Owner owner;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Owner {
        String display_name;
    }

}
