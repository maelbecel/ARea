package fr.zertus.area.entity;

import fr.zertus.area.entity.action.Action;
import fr.zertus.area.entity.reaction.Reaction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Service {

    String name;
    String slug;
    List<Action> actions;
    List<Reaction> reactions;
    boolean oauth2;
    OAuth2CodeAuthorizationHandler oauth2handler;

    public Service(String name, String slug) {
        this.name = name;
        this.slug = slug;
        this.actions = new ArrayList<>();
        this.reactions = new ArrayList<>();
    }

    public Service(String name, String slug, List<Action> actions, List<Reaction> reactions) {
        this.name = name;
        this.slug = slug;
        this.actions = actions;
        this.reactions = reactions;
    }

}
