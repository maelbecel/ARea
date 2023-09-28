package fr.zertus.area.controller;

import fr.zertus.area.payload.response.AboutJSON;
import fr.zertus.area.service.AboutJSONService;
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

    @Operation(summary = "Get about.json", description = "Get about.json", tags = { "About" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "About.json",
                content = @Content(
                    schema = @Schema(implementation = AboutJSON.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response",
                            description = "This is an example of about.json",
                            value = "{\"client\":{\"host\":\"ip of client\"},\"server\":{\"current_time\":time of service in epoch format,\"services\":[{\"name\":\"Github\",\"slug\":\"github\",\"actions\":[],\"reactions\":[],\"decoration\":{\"logoUrl\":\"https://imgur.com/kcALSJQ.png\",\"backgroundColor\":\"#7388D9\"}}]}}"
                        )
                    }
                )
            ),
    })
    @GetMapping
    public ResponseEntity<AboutJSON> getAboutJSON() {
        return ResponseEntity.ok(aboutJSONService.getAboutJSON());
    }

}
