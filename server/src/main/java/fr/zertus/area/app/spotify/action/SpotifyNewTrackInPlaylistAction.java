package fr.zertus.area.app.spotify.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.utils.FormInput;

import java.util.List;
import java.util.Map;

public class SpotifyNewTrackInPlaylistAction extends Action implements ManualTrigger {

    public SpotifyNewTrackInPlaylistAction(String appName) {
        super(appName, "New track in playlist", "When new track is added to a playlist");
    }

    @Override
    public List<FormInput> getInputs(User user) {
        return super.getInputs(user);
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        super.setupAction(user, inputs);
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        return true;
    }

    @Override
    public List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException {
        return null;
    }

}
