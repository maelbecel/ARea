package fr.zertus.area.controller;

import fr.zertus.area.app.twitch.TwitchApp;
import fr.zertus.area.app.twitch.model.TwitchAppToken;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/test")
@Hidden
public class TestController {

    @GetMapping()
    public ResponseEntity<?> test() {
        TwitchAppToken token = TwitchApp.getAppToken();
        return ResponseEntity.ok(token);
    }

}
