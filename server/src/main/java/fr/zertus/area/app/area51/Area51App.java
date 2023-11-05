package fr.zertus.area.app.area51;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.area51.action.Area51AppletCreatedAction;
import fr.zertus.area.app.area51.action.Area51AppletDeletedAction;
import fr.zertus.area.app.area51.action.Area51AppletUpdatedAction;
import fr.zertus.area.utils.IPGetter;

import java.util.List;

public class Area51App extends App {

    @Override
    public String getName() {
        return "Area51";
    }

    @Override
    public List<Action> getActions() {
        return List.of(
            new Area51AppletCreatedAction(getName()),
            new Area51AppletUpdatedAction(getName()),
            new Area51AppletDeletedAction(getName())
        );
    }

    @Override
    public List<Reaction> getReactions() {
        return List.of();
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/area51/image", "#363841",
            "Area51 is a service that allows you to create applets that will be triggered by actions.", "http://etipech.me/");
    }

}
