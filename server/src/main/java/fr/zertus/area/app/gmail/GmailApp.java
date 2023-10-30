package fr.zertus.area.app.gmail;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.gmail.action.GmailHaveNewMailAction;
import fr.zertus.area.app.gmail.reaction.GmailSendMailReaction;
import fr.zertus.area.app.google.GoogleOAuth2Handler;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.IPGetter;

import java.util.List;

public class GmailApp extends App {

    private static final OAuth2CodeAuthorizationHandler handler = new GoogleOAuth2Handler();

    @Override
    public String getName() {
        return "Gmail";
    }

    @Override
    public List<Action> getActions() {
        return List.of(
            new GmailHaveNewMailAction(getName())
        );
    }

    @Override
    public List<Reaction> getReactions() {
        return List.of(
            new GmailSendMailReaction(getName())
        );
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/gmail/image", "#FFFFFF",
            "Connect Gmail to send emails to yourself and others.", "https://www.google.com/gmail/about/");
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
