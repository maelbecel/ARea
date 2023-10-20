package fr.zertus.area.app.google;

import com.google.gson.Gson;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.google.model.GoogleUserInfo;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.StringUtils;
import lombok.Data;

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
        return new AppDecoration("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png", "#FFFFFF");
    }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return handler;
    }

    @Override
    public boolean isOAuth2() {
        return true;
    }

    public static GoogleUserInfo getUserInfo(ConnectedService service) {
        if (service == null)
            return null;
        if (service.getData() == null)
            return null;

        return new Gson().fromJson(service.getData(), GoogleUserInfo.class);
    }

}
