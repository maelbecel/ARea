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
                    value = ""
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
            description = "Applet deleted"
        )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAppletById(@PathVariable long id) {
        appletService.delete(id);
        return ApiResponse.noContent().toResponseEntity();
    }

}
