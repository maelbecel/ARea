package fr.zertus.area.controller;

import fr.zertus.area.payload.response.AboutJSON;
import fr.zertus.area.service.AboutJSONService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/about.json")
public class AboutJSONController {

    @Autowired
    private AboutJSONService aboutJSONService;

    @GetMapping
    public ResponseEntity<AboutJSON> getAboutJSON() {
        return ResponseEntity.ok(aboutJSONService.getAboutJSON());
    }

}
