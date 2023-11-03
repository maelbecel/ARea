package fr.zertus.area.app.time;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.time.action.TimeAtHourAction;
import fr.zertus.area.utils.IPGetter;

import java.util.List;

public class TimeApp extends App {

    @Override
    public String getName() {
        return "Time";
    }

    @Override
    public List<Action> getActions() {
        return List.of(
            new TimeAtHourAction(getName())
        );
    }

    @Override
    public List<Reaction> getReactions() {
        return null;
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/time/image", "#267a3c",
            "Manage your time and that of your applets! Adds the possibility of triggering your applets at certain times", "");
    }

}
