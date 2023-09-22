package fr.zertus.area.controller;

import fr.zertus.area.app.App;
import fr.zertus.area.app.discord.DiscordOAuth2Handler;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import fr.zertus.area.service.AppService;
import fr.zertus.area.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/service")
public class AppController {

    private static final Logger logger = LoggerFactory.getLogger(DiscordOAuth2Handler.class);

    @Autowired
    private AppService appService;

    @GetMapping("{slug}/oauth2")
    public ResponseEntity<ApiResponse<String>> redirectToOAuth2(@PathVariable String slug) throws DataNotFoundException {
        return appService.redirectOAuth2App(slug);
    }

    @GetMapping("{slug}/callback")
    public ResponseEntity<ApiResponse<String>> handleOAuth2Callback(@PathVariable String slug, @RequestParam(required = false) String error,
                                                                    @RequestParam(required = false) String code, @RequestParam String state) throws DataNotFoundException {
        return appService.callbackOAuth2App(slug, code, state, error);
    }

}
