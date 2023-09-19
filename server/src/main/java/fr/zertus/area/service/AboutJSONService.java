package fr.zertus.area.service;

import fr.zertus.area.payload.response.AboutJSON;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AboutJSONService {

    public AboutJSON getAboutJSON() {
        return new AboutJSON(new ArrayList<>());
    }

}
