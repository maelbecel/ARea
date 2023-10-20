package fr.zertus.area.app.gmail;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.gmail.reaction.GmailSendMailReaction;
import fr.zertus.area.app.google.GoogleOAuth2Handler;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;

import java.util.List;

public class GmailApp extends App {

    private static final OAuth2CodeAuthorizationHandler handler = new GoogleOAuth2Handler();

    @Override
    public String getName() {
        return "Gmail";
    }

    @Override
    public List<Action> getActions() {
        return null;
    }

    @Override
    public List<Reaction> getReactions() {
        return List.of(
            new GmailSendMailReaction(getName())
        );
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png", "#EAEAEA");
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
