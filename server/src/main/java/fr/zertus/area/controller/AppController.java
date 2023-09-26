package fr.zertus.area.controller;

import fr.zertus.area.app.App;
import fr.zertus.area.app.discord.DiscordOAuth2Handler;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import fr.zertus.area.service.AppService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/service")
@Tag(name = "App", description = "App endpoint")
public class AppController {

    private static final Logger logger = LoggerFactory.getLogger(DiscordOAuth2Handler.class);

    @Autowired
    private AppService appService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<App>>> getAllApps() {
        return ApiResponse.ok(appService.getApps()).toResponseEntity();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<App>> getAppBySlug(@PathVariable String slug) throws DataNotFoundException {
        App app = appService.getApp(slug);
        if (app == null) {
            throw new DataNotFoundException("App not found");
        }
        return ApiResponse.ok(app).toResponseEntity();
    }


    @Operation(summary = "OAuth2 Web", description = "Execute the OAuth2 backend process to allow the user to be connected to the service they want on web.", tags = { "App" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "302", description = "Redirect to the OAuth2 page"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
    })
    @GetMapping("/{slug}/oauth2")
    public ResponseEntity<ApiResponse<String>> redirectToOAuth2(@PathVariable String slug, @RequestParam(required = false) String authToken, @RequestParam(required = false) String redirecturi) throws DataNotFoundException, IllegalAccessException {
        if (authToken == null && SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new IllegalAccessException("You must be logged in to access this page.");
        }

        Long userId = null;
        if (authToken == null) {
            try {
                userId = SecurityUtils.getCurrentUserId();
            } catch (Exception e) {
                throw new IllegalAccessException("You must be logged in to access this page.");
            }
        } else {
            userId = SecurityUtils.getUserIdFromTempToken(authToken);
        }
        return appService.redirectOAuth2App(slug, userId, redirecturi);
    }

    @Operation(summary = "OAuth2 Mobile", description = "Execute the OAuth2 backend process to allow the user to be connected to the service they want on mobile.", tags = { "App" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Return a token", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
    })
    @GetMapping("/{slug}/oauth2/mobile")
    public ResponseEntity<ApiResponse<String>> getTempToken(@PathVariable String slug) throws DataNotFoundException {
        long userId = SecurityUtils.getCurrentUserId();
        return ApiResponse.ok(SecurityUtils.getTempToken(userId)).toResponseEntity();
    }

    @Hidden
    @GetMapping("/{slug}/callback")
    public ResponseEntity<ApiResponse<String>> handleOAuth2Callback(@PathVariable String slug, @RequestParam(required = false) String error,
                                                                    @RequestParam(required = false) String code, @RequestParam String state) throws DataNotFoundException {
        return appService.callbackOAuth2App(slug, code, state, error);
    }

}
