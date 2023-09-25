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
    public ResponseEntity<ApiResponse<String>> redirectToOAuth2(@PathVariable String slug, @RequestParam(required = false) String authToken, @RequestParam(required = false) String redirecturi) throws DataNotFoundException {
        if (authToken == null && SecurityContextHolder.getContext() == null) {
            return ApiResponse.unauthorized("You must be logged in to access this resource").toResponseEntity();
        }

        Long userId = null;
        if (authToken == null) {
            userId = SecurityUtils.getCurrentUserId();
        } else {
            userId = SecurityUtils.getUserIdFromTempToken(authToken);
        }
        return appService.redirectOAuth2App(slug, userId, redirecturi);
    }

    @GetMapping("{slug}/oauth2/mobile")
    public ResponseEntity<ApiResponse<String>> getTempToken(@PathVariable String slug) throws DataNotFoundException {
        long userId = SecurityUtils.getCurrentUserId();
        return ApiResponse.ok(SecurityUtils.getTempToken(userId)).toResponseEntity();
    }

    @GetMapping("{slug}/callback")
    public ResponseEntity<ApiResponse<String>> handleOAuth2Callback(@PathVariable String slug, @RequestParam(required = false) String error,
                                                                    @RequestParam(required = false) String code, @RequestParam String state) throws DataNotFoundException {
        return appService.callbackOAuth2App(slug, code, state, error);
    }

}
