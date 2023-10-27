package fr.zertus.area.app.spotify;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.StringUtils;

import java.util.List;

public class SpotifyApp extends App {

    private static final SpotifyOAuth2Handler oAuth2Handler = new SpotifyOAuth2Handler();

    @Override
    public String getName() {
        return "Spotify";
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
        return new AppDecoration("https://area51.zertus.fr/service/spotify/image", "#18D860",
            "Spotify is a digital music service that gives you access to millions of songs.", "https://www.spotify.com/");
    }

    @Override
    public boolean isOAuth2() {
        return true;
    }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return oAuth2Handler;
    }

}
