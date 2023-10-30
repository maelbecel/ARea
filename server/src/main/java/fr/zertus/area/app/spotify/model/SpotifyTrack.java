package fr.zertus.area.app.spotify.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SpotifyTrack {

    Track track;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Track {
        String name;
        List<Artist> artists;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Artist {
        String name;
    }

}
