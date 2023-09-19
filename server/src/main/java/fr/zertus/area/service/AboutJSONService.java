package fr.zertus.area.service;

import fr.zertus.area.app.App;
import fr.zertus.area.payload.response.AboutJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AboutJSONService {

    @Autowired
    private AppService appService;

    public AboutJSON getAboutJSON() {
        List<App.AboutJSONApp> apps = new ArrayList<>();
        for (App app : appService.getApps()) {
            apps.add(app.getAbout());
        }
        return new AboutJSON(apps);
    }

}
