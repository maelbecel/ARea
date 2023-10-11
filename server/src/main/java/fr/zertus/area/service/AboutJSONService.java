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

    /**
     * Get the about JSON
     * (see {@link AboutJSON})
     * @return the about JSON
     */
    public AboutJSON getAboutJSON() {
        return new AboutJSON(appService.getApps());
    }

}
