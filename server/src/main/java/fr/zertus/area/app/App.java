package fr.zertus.area.app;

import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;

import java.util.List;

public abstract class App implements IApp {

    public abstract String getName();
    public abstract String getSlug();
    public abstract List<Action> getActions();
    public abstract List<Reaction> getReactions();

    public boolean isOAuth2() {
        return false;
    }

    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return null;
    }

    public AboutJSONApp getAbout() {
        return new AboutJSONApp(getName(), getSlug(), getActions(), getReactions());
    }

    public static class AboutJSONApp {
        public String name;
        public String slug;
        public List<Action> actions;
        public List<Reaction> reactions;

        public AboutJSONApp(String name, String slug, List<Action> actions, List<Reaction> reactions) {
            this.name = name;
            this.slug = slug;
            this.actions = actions;
            this.reactions = reactions;
        }
    }

}
