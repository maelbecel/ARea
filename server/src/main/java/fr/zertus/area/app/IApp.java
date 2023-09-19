package fr.zertus.area.app;

import fr.zertus.area.entity.action.Action;
import fr.zertus.area.entity.reaction.Reaction;

import java.util.List;

public interface IApp {

    String getName();

    String getSlug();

    List<Action> getActions();

    List<Reaction> getReactions();

}
