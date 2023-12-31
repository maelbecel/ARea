package fr.zertus.area.app.youtube;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.google.GoogleOAuth2Handler;
import fr.zertus.area.app.youtube.action.YoutubeNewVideoAction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.IPGetter;

import java.util.List;

public class YoutubeApp extends App {

    private static final OAuth2CodeAuthorizationHandler handler = new GoogleOAuth2Handler();

    @Override
    public String getName() {
        return "Youtube";
    }

    @Override
    public List<Action> getActions() {
        return List.of(
            new YoutubeNewVideoAction(getName())
        );
    }

    @Override
    public List<Reaction> getReactions() {
        return null;
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/youtube/image", "#FF0000",
            "YouTube is a video-sharing website on which users can upload, share, and view videos.", "https://www.youtube.com/");
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
