package fr.zertus.area.controller;

import fr.zertus.area.entity.Applet;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.request.applet.AppletDTO;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import fr.zertus.area.service.AppletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/applet")
@Tag(name = "Applet", description = "Applets endpoint")
public class AppletController {

    @Autowired
    private AppletService appletService;

    @Operation(summary = "Get all applets for current user", tags = { "Applet" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "List of applets for current user",
                content = @Content(
                    mediaType = "application/json",
                    schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = Applet.class),
                    examples = @ExampleObject(
                        name = "Example with 1 applet for current user",
                        value = ""
                    )
                )
            ),
    })
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<Applet>>> getAppletsForUser() throws DataNotFoundException {
        long userId = SecurityUtils.getCurrentUserId();
        List<Applet> applets = appletService.getForUser(userId);
        return ApiResponse.ok(applets).toResponseEntity();
    }

    @Operation(summary = "Get an applet by its id", tags = { "Applet" })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Applet found",
            content = @Content(
                mediaType = "application/json",
                schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = Applet.class),
                examples = @ExampleObject(
                    name = "Example with applet with id 1",
                    value = ""
                )
            )
        )
    })
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Applet>> getAppletById(@PathVariable long id) throws DataNotFoundException {
        Applet applet = appletService.getById(id);
        return ApiResponse.ok(applet).toResponseEntity();
    }

    @Operation(summary = "Create an applet", description = "Create an applet for current user", tags = { "Applet" },
    parameters = {
        @Parameter(name = "applet", description = "Applet to create", required = true)
    })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "201",
            description = "Applet created",
            content = @Content(
                mediaType = "application/json",
                schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = Applet.class),
                examples = @ExampleObject(
                    name = "Example with applet created",
                    value = "{\"status\":201,\"message\":\"Created\",\"data\":{\"id\":34,\"user\":{\"id\":8,\"email\":\"billy.bob@zertus.fr\",\"username\":\"BillyBob\",\"connectedServices\":[\"spotify\",\"notion\",\"discord\",\"github\",\"twitch\",\"google\"],\"passwordLength\":12},\"name\":\"Issue on repo lucasdpt/sockets-c - Send mail\",\"actionSlug\":\"github.issue-opened-on-repo\",\"actionData\":\"[{\\\"name\\\":\\\"repository\\\",\\\"label\\\":\\\"Repository\\\",\\\"type\\\":\\\"SELECT\\\",\\\"value\\\":\\\"lucasdpt/sockets-c\\\",\\\"options\\\":[\\\"lucasdpt/sockets-c\\\"]}]\",\"actionTrigger\":\"\",\"reactionSlug\":\"google.send-mail\",\"reactionData\":\"[{\\\"name\\\":\\\"to\\\",\\\"label\\\":\\\"To\\\",\\\"type\\\":\\\"TEXT\\\",\\\"value\\\":\\\"lh.dupont@gmail.com\\\"},{\\\"name\\\":\\\"subject\\\",\\\"label\\\":\\\"Subject\\\",\\\"type\\\":\\\"TEXT\\\",\\\"value\\\":\\\"{repository}\\\"},{\\\"name\\\":\\\"body\\\",\\\"label\\\":\\\"Body\\\",\\\"type\\\":\\\"TEXT\\\",\\\"value\\\":\\\"**Issue ID**: {issue_id}\\\\n**Issue body**: {issue_body}\\\\n**Go to**: {issue_url}\\\"}]\",\"createdAt\":1697786674,\"logs\":\"[]\",\"notifUser\":true,\"enabled\":true}}"
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Bad form input",
            content = @Content(
                mediaType = "application/json",
                schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class),
                examples = @ExampleObject(
                    name = "Example with bad form input",
                    value = "{\"code\":400,\"message\":\"Bad form input\"}"
                )
            )
        )
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Applet>> createApplet(@RequestBody AppletDTO applet) throws DataNotFoundException, BadFormInputException {
        return ApiResponse.created(appletService.save(applet)).toResponseEntity();
    }

    @Operation(summary = "Delete an applet", description = "Delete an applet by its id", tags = { "Applet" })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "204",
            description = "Applet deleted",
            content = @Content
        )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAppletById(@PathVariable long id) throws DataNotFoundException {
        appletService.delete(id);
        return ApiResponse.noContent().toResponseEntity();
    }

    @Operation(summary = "Update an applet", description = "Update an applet by its id", tags = { "Applet" },
         parameters = {
            @Parameter(name = "id", description = "Applet id", required = true),
            @Parameter(name = "applet", description = "Applet to update", required = true)
         })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Applet updated",
            content = @Content(
                mediaType = "application/json",
                schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = Applet.class),
                examples = @ExampleObject(
                    name = "Example with applet updated",
                    value = "{\"status\":201,\"message\":\"Created\",\"data\":{\"id\":34,\"user\":{\"id\":8,\"email\":\"billy.bob@zertus.fr\",\"username\":\"BillyBob\",\"connectedServices\":[\"spotify\",\"notion\",\"discord\",\"github\",\"twitch\",\"google\"],\"passwordLength\":12},\"name\":\"Issue on repo lucasdpt/sockets-c - Send mail\",\"actionSlug\":\"github.issue-opened-on-repo\",\"actionData\":\"[{\\\"name\\\":\\\"repository\\\",\\\"label\\\":\\\"Repository\\\",\\\"type\\\":\\\"SELECT\\\",\\\"value\\\":\\\"lucasdpt/sockets-c\\\",\\\"options\\\":[\\\"lucasdpt/sockets-c\\\"]}]\",\"actionTrigger\":\"\",\"reactionSlug\":\"google.send-mail\",\"reactionData\":\"[{\\\"name\\\":\\\"to\\\",\\\"label\\\":\\\"To\\\",\\\"type\\\":\\\"TEXT\\\",\\\"value\\\":\\\"lh.dupont@gmail.com\\\"},{\\\"name\\\":\\\"subject\\\",\\\"label\\\":\\\"Subject\\\",\\\"type\\\":\\\"TEXT\\\",\\\"value\\\":\\\"{repository}\\\"},{\\\"name\\\":\\\"body\\\",\\\"label\\\":\\\"Body\\\",\\\"type\\\":\\\"TEXT\\\",\\\"value\\\":\\\"**Issue ID**: {issue_id}\\\\n**Issue body**: {issue_body}\\\\n**Go to**: {issue_url}\\\"}]\",\"createdAt\":1697786674,\"logs\":\"[]\",\"notifUser\":true,\"enabled\":true}}"
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Applet not found",
            content = @Content(
                mediaType = "application/json",
                schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class),
                examples = @ExampleObject(
                    name = "Example with applet not found",
                    value = "{\"code\":404,\"message\":\"Applet not found\"}"
                )
            )
        )
    })
    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<Applet>> updateApplet(@PathVariable long id, @RequestBody AppletDTO dto) throws DataNotFoundException {
        return ApiResponse.ok(appletService.update(id, dto)).toResponseEntity();
    }


}
