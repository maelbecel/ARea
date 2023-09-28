package fr.zertus.area.controller;

import fr.zertus.area.app.App;
import fr.zertus.area.app.discord.DiscordOAuth2Handler;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import fr.zertus.area.service.AppService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/service")
@Tag(name = "Service", description = "Services endpoint")
public class AppController {

    private static final Logger logger = LoggerFactory.getLogger(DiscordOAuth2Handler.class);

    @Autowired
    private AppService appService;

    @Operation(summary = "Get all services", description = "Get all the services available on the API.", tags = { "Service" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Return a list of services",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = App.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response",
                            description = "This is an example with one service",
                            value = "{\"status\":200,\"message\":\"OK\",\"data\":[{\"name\":\"Github\",\"slug\":\"github\",\"actions\":[],\"reactions\":[],\"decoration\":{\"logoUrl\":\"https://imgur.com/kcALSJQ.png\",\"backgroundColor\":\"#7388D9\"}}]}"
                        )
                    }
                )),
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<App>>> getAllApps() {
        return ApiResponse.ok(appService.getApps()).toResponseEntity();
    }

    @Operation(summary = "Get one service", description = "Get one service by given it's slug.", tags = { "Service" })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Service found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = App.class),
                examples = {
                    @ExampleObject(
                        name = "Example response",
                        description = "This is an example with github service",
                        value = "{\"status\":200,\"message\":\"OK\",\"data\":{\"name\":\"Github\",\"slug\":\"github\",\"actions\":[],\"reactions\":[],\"decoration\":{\"logoUrl\":\"https://imgur.com/kcALSJQ.png\",\"backgroundColor\":\"#7388D9\"}}}"
                    )
                }
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Service not found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponse.class),
                examples = {
                    @ExampleObject(
                        name = "Example response",
                        description = "This is an example with not found service",
                        value = "{\"status\":404,\"message\":\"Service not found\"}"
                    )
                }
            )
        )
    })
    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<App>> getAppBySlug(@PathVariable String slug) throws DataNotFoundException {
        App app = appService.getApp(slug);
        if (app == null) {
            throw new DataNotFoundException("Service not found");
        }
        return ApiResponse.ok(app).toResponseEntity();
    }

    @Operation(summary = "Init proccess of OAuth2", description = "This call is use to start OAuth2 proccess from given service", tags = { "Service" },
    parameters = {
        @Parameter(name = "slug", description = "Slug of the service", required = true, example = "github"),
        @Parameter(name = "authToken", description = "Auth token to identify user. Only use if you can't add Authorization Header in your request", required = false),
        @Parameter(name = "redirecturi", description = "Server redirect to uri when oauth2 proccess is done", required = true)
    })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "302",
            description = "Redirect to OAuth2 page",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponse.class),
                examples = {
                    @ExampleObject(
                        name = "Example response",
                        description = "This is an example with valid request",
                        value = "{\"status\":302,\"message\":\"Redirect in progress.\"}"
                    )
                }
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Unauthorized",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponse.class),
                examples = {
                    @ExampleObject(
                        name = "Example response",
                        description = "This is an example with no auth token given or if token given in Authorization header is invalid",
                        value = "{\"status\":401,\"message\":\"You must be logged in to access this page.\"}"
                    )
                }
            )
        )
    })
    @GetMapping("/{slug}/oauth2")
    public ResponseEntity<ApiResponse<String>> redirectToOAuth2(@PathVariable String slug, @RequestParam(required = false) String authToken, @RequestParam(required = true) String redirecturi) throws IllegalAccessException {
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

    @Operation(summary = "Get temporary token", description = "This call is use to get temporary token for OAuth2 proccess", tags = { "Service" },
    parameters = {
        @Parameter(name = "slug", description = "Slug of the service", required = true, example = "github"),
    })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Return temporary token",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponse.class),
                examples = {
                    @ExampleObject(
                        name = "Example response",
                        description = "This is an example with no auth token given or if token given in Authorization header is invalid",
                        value = "{\"status\":200,\"message\":\"OK\",\"data\":\"YourTempToken\"}"
                    )
                }
            )
        )
    })
    @GetMapping("/{slug}/oauth2/token")
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
