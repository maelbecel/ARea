package fr.zertus.area.app;

import java.util.List;

public interface IApp {

    String getName();

    String getSlug();

    List<Action> getActions();

    List<Reaction> getReactions();

}
