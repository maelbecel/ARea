package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionReactionService {

    @Autowired
    private AppService appService;

    public List<Action> getActions(String slug) {
        return appService.getApp(slug).getActions();
    }

    public List<Reaction> getReactions(String slug) {
        return appService.getApp(slug).getReactions();
    }

    public Action getAction(String slug, String actionSlug) {
        return appService.getApp(slug).getActions().stream().filter(action -> action.getSlug().equals(actionSlug)).findFirst().orElse(null);
    }

    public Reaction getReaction(String slug, String reactionSlug) {
        return appService.getApp(slug).getReactions().stream().filter(reaction -> reaction.getSlug().equals(reactionSlug)).findFirst().orElse(null);
    }

    public Action getAction(String actionSlug) {
        String[] slug = actionSlug.split("\\.");
        return getAction(slug[0], actionSlug);
    }

    public Reaction getReaction(String reactionSlug) {
        String[] slug = reactionSlug.split("\\.");
        return getReaction(slug[0], reactionSlug);
    }

}
