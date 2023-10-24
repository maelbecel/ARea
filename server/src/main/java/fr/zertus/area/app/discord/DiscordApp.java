package fr.zertus.area.app.discord;

import fr.zertus.area.app.App;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.discord.reaction.DiscordSendMessageWithWebhookReaction;
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
        return List.of(
            new DiscordSendMessageWithWebhookReaction(getName())
        );
    }

    @Override
    public boolean isOAuth2() { return true; }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() { return handler; }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration("https://imgur.com/kcALSJQ.png", "#7388D9",
            "Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.", "https://discord.com");
    }
}