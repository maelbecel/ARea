package fr.zertus.area.app.google;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.StringUtils;

import java.util.List;

public class GoogleApp extends App {

    private final GoogleOAuth2Handler handler = new GoogleOAuth2Handler();

    @Override
    public String getName() {
        return "Google";
    }

    @Override
    public String getSlug() {
        return StringUtils.slugify(getName());
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
    public AppDecoration getDecoration() {
        return new AppDecoration("", "");
    }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return handler;
    }

    @Override
    public boolean isOAuth2() {
        return true;
    }
}
