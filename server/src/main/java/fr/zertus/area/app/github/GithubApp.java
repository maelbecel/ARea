package fr.zertus.area.app.github;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;

import java.util.ArrayList;
import java.util.List;

public class GithubApp extends App {

    private static OAuth2CodeAuthorizationHandler handler = new GithubOAuth2Handler();

    @Override
    public String getName() {
        return "Github";
    }

    @Override
    public String getSlug() {
        return "github";
    }

    @Override
    public List<Action> getActions() {
        return new ArrayList<>();
    }

    @Override
    public List<Reaction> getReactions() {
        return new ArrayList<>();
    }

    @Override
    public boolean isOAuth2() {
        return true;
    }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return handler;
    }
}
