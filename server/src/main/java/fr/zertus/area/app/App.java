package fr.zertus.area.app;

import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

public abstract class App implements IApp {

    public abstract String getName();
    public abstract String getSlug();
    public abstract List<Action> getActions();
    public abstract List<Reaction> getReactions();

    public abstract AppDecoration getDecoration();

    public boolean isOAuth2() {
        return false;
    }

    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return null;
    }

    @Data
    @AllArgsConstructor
    public static class AppDecoration {
        private String logoUrl;
        private String backgroundColor;
    }

}
