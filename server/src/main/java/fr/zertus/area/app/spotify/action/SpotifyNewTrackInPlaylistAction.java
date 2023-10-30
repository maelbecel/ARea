package fr.zertus.area.app.spotify.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.app.spotify.model.SpotifyPlaylist;
import fr.zertus.area.app.spotify.model.SpotifyTrack;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.ActionTriggerUtils;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class SpotifyNewTrackInPlaylistAction extends Action implements ManualTrigger {

    public SpotifyNewTrackInPlaylistAction(String appName) {
        super(appName, "New track in playlist", "When new track is added to a playlist");

        this.inputs.add(FormInput.createSelectInput("get_time", "Time between each check",
            List.of("3 minutes",
                "5 minutes",
                "10 minutes",
                "15 minutes",
                "30 minutes",
                "1 hour"
                )));
        this.inputs.add(FormInput.createSelectInput("playlist", "Playlist", null));

        this.placeholders.put("track_name", "Track name");
        this.placeholders.put("artist_name", "Artist name");
        this.placeholders.put("playlist_name", "Playlist name");
    }

    @Override
    public List<FormInput> getInputs(User user) {
        ConnectedService service = user.getConnectedService("spotify");
        if (service == null) {
            throw new IllegalArgumentException("User is not connected to spotify");
        }
        try {
            String url = "https://api.spotify.com/v1/me/playlists?limit=50";
            ApiResponse<SpotifyPlaylistResponse> response = BasicApiClient.sendGetRequest(url, SpotifyPlaylistResponse.class, Map.of(
                "Authorization", "Bearer " + service.getToken()
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300) {
                throw new IllegalArgumentException("Error while getting playlists");
            }
            List<String> playlistsName = response.getData().getItems().stream().map(SpotifyPlaylist::getName).toList();
            return List.of(
                FormInput.createSelectInput("get_time", "Time between each check",
                    List.of("3 minutes",
                        "5 minutes",
                        "10 minutes",
                        "15 minutes",
                        "30 minutes",
                        "1 hour"
                    )),
                FormInput.createSelectInput("playlist", "Playlist", playlistsName)
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Error while getting playlists");
        }
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        ConnectedService service = user.getConnectedService("spotify");
        if (service == null) {
            throw new ActionTriggerException("User is not connected to spotify");
        }
        try {
            String url = "https://api.spotify.com/v1/me/playlists?limit=50";
            ApiResponse<SpotifyPlaylistResponse> response = BasicApiClient.sendGetRequest(url, SpotifyPlaylistResponse.class, Map.of(
                "Authorization", "Bearer " + service.getToken()
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300) {
                throw new ActionTriggerException("Error while getting playlists");
            }
            String playlistName = FormInputUtils.getValue("playlist", inputs);
            for (SpotifyPlaylist playlist : response.getData().getItems()) {
                if (playlist.getName().equals(playlistName)) {
                    inputs.add(FormInput.createHiddenInput("playlist_id", "Playlist ID", playlist.getId()));
                    break;
                }
            }
        } catch (Exception e) {
            throw new ActionTriggerException("Error while getting playlists");
        }

        String time = FormInputUtils.getValue("get_time", inputs);
        inputs.add(FormInput.createHiddenInput("trigger", "Trigger", ActionTriggerUtils.getTimeInSecond(time)));

        inputs.add(FormInput.createHiddenInput("playlist_tracks", "Playlist tracks", ""));
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        return true;
    }

    @Override
    public List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException {
        ConnectedService service = user.getConnectedService("spotify");
        if (service == null)
            throw new ActionTriggerException("User is not connected to spotify");

        String playlistId = FormInputUtils.getValue("playlist_id", inputs);
        String url = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks";

        try {
            ApiResponse<SpotifyPlaylistTracksResponse> response = BasicApiClient.sendGetRequest(url, SpotifyPlaylistTracksResponse.class, Map.of(
               "Authorization", "Bearer " + service.getToken()
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300) {
                throw new ActionTriggerException("Error while getting playlist tracks");
            }
            List<Map<String, String>> result = new ArrayList<>();
            List<String> alreadyTriggeredTracks = new ArrayList<>(Arrays.stream(FormInputUtils.getValue("playlist_tracks", inputs).split("@")).toList());
            boolean firstTrigger = alreadyTriggeredTracks.isEmpty();

            for (SpotifyTrack track : response.getData().getItems()) {
                if (!alreadyTriggeredTracks.contains(track.getTrack().getName() + "-" + track.getTrack().getArtists().get(0).getName())) {
                    Map<String, String> map = Map.of(
                        "track_name", track.getTrack().getName(),
                        "artist_name", track.getTrack().getArtists().get(0).getName(),
                        "playlist_name", FormInputUtils.getValue("playlist", inputs)
                    );
                    result.add(map);
                    alreadyTriggeredTracks.add(track.getTrack().getName() + "-" + track.getTrack().getArtists().get(0).getName());
                }
            }
            FormInputUtils.remove("playlist_tracks", inputs);
            inputs.add(FormInput.createHiddenInput("playlist_tracks", "Playlist tracks", String.join("@", alreadyTriggeredTracks)));

            if (firstTrigger)
                return List.of();
            return result;
        } catch (Exception e) {
            throw new ActionTriggerException(e.getMessage());
        }
    }

    @Data
    public static class SpotifyPlaylistResponse {
        int total;
        List<SpotifyPlaylist> items;
    }

    @Data
    public static class SpotifyPlaylistTracksResponse {
        int total;
        List<SpotifyTrack> items;
    }

}
