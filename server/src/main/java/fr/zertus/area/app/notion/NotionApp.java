package fr.zertus.area.app.notion;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.StringUtils;

import java.util.List;

public class NotionApp extends App {

    private final NotionOAuth2Handler oAuth2Handler = new NotionOAuth2Handler();

    @Override
    public String getName() {
        return "Notion";
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
        return new AppDecoration("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png", "#FFFFFF",
            "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team.", "https://www.notion.so/");
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
