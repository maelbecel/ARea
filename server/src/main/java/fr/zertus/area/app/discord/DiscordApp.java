package fr.zertus.area.app.discord;

import fr.zertus.area.app.App;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;

import java.util.List;

public class DiscordApp extends App {

    private static final OAuth2CodeAuthorizationHandler handler = new DiscordOAuth2Handler();

    @Override
    public String getName() { return "Discord"; }

    @Override
    public String getSlug() {
        return "discord";
    }

    @Override
    public List<Action> getActions() {
        return null;
    }

    @Override
    public List<Reaction> getReactions() {
        return null;
    }

    @Override
    public boolean isOAuth2() { return true; }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() { return handler; }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration("", "");
    }
}