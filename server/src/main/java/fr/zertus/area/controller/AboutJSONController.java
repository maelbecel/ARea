package fr.zertus.area.controller;

import fr.zertus.area.payload.response.AboutJSON;
import fr.zertus.area.service.AboutJSONService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/about.json")
@Tag(name = "About", description = "About.json endpoint")
public class AboutJSONController {

    @Autowired
    private AboutJSONService aboutJSONService;

    @Hidden
    @GetMapping
    public ResponseEntity<AboutJSON> getAboutJSON() {
        return ResponseEntity.ok(aboutJSONService.getAboutJSON());
    }

}
