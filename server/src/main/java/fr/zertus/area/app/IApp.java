package fr.zertus.area.app;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;

import java.util.List;

public interface IApp {

    String getName();

    String getSlug();

    List<Action> getActions();

    List<Reaction> getReactions();

}
