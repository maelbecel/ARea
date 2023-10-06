package fr.zertus.area.controller;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.response.ActionResponse;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.payload.response.ReactionResponse;
import fr.zertus.area.security.utils.SecurityUtils;
import fr.zertus.area.service.ActionReactionService;
import fr.zertus.area.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@Tag(name = "Actions & Reactions", description = "Actions & Reactions endpoint")
public class ActionReactionController {

    @Autowired
    private ActionReactionService actionReactionService;

    @Autowired
    private UserService userService;

    @Operation(summary = "Get action inputs", description = "Get action inputs from is slug", tags = {"Actions & Reactions"}, parameters =
        {
            @Parameter(name = "slug", description = "Action slug", required = true)
        })
    @ApiResponses(value={
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Action not found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ActionResponse.class),
                examples = @ExampleObject(
                    name = "Action not found",
                    value = "{\"status\":404,\"message\":\"Action not found\"}"
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Action found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ActionResponse.class),
                examples = @ExampleObject(
                    name = "Action found",
                    value = "{\"status\":200,\"message\":\"OK\",\"data\":{\"slug\":\"twitch.one-stream-start\",\"inputs\":[{\"name\":\"channel\",\"label\":\"Channel name\",\"type\":\"TEXT\"}]}}"
                )
            )
        )
    })
    @GetMapping("/action/{slug}")
    public ResponseEntity<ApiResponse<ActionResponse>> getAction(@PathVariable String slug) throws DataNotFoundException {
        Action action = actionReactionService.getAction(slug);
        User user = userService.getCurrentUser();

        if (action == null)
            throw new DataNotFoundException("Action not found");
        ActionResponse actionResponse = new ActionResponse(action.getSlug(), action.getInputs(user));
        return ApiResponse.ok(actionResponse).toResponseEntity();
    }

    @Operation(summary = "Get reaction inputs", description = "Get reaction inputs from is slug and action slug", tags = {"Actions & Reactions"},
    parameters = {
        @Parameter(name = "slug", description = "Reaction slug", required = true),
        @Parameter(name = "actionSlug", description = "Action slug", required = true)
    })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Reaction found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ReactionResponse.class),
                examples = @ExampleObject(
                    name = "Reaction found",
                    value = "{\"status\":200,\"message\":\"OK\",\"data\":{\"slug\":\"discord.send-message-in-channel\",\"inputs\":[{\"name\":\"webhook\",\"label\":\"Webhook URL\",\"type\":\"TEXT\"}],\"placeholders\":{\"viewer\":\"Viewer count\",\"game\":\"Game name\",\"channel\":\"Channel name\",\"link\":\"Stream link\",\"started_at\":\"Stream start date\",\"title\":\"Stream title\"}}}"
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Reaction not found",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ReactionResponse.class),
                examples = @ExampleObject(
                    name = "Reaction not found",
                    value = "{\"status\":404,\"message\":\"Reaction not found\"}"
                )
            )
        ),
    })
    @GetMapping("/reaction/{slug}/{actionSlug}")
    public ResponseEntity<ApiResponse<ReactionResponse>> getReaction(@PathVariable String slug, @PathVariable String actionSlug) throws DataNotFoundException {
        Reaction reaction = actionReactionService.getReaction(slug);
        Action action = actionReactionService.getAction(actionSlug);
        User user = userService.getCurrentUser();

        if (reaction == null)
            throw new DataNotFoundException("Reaction not found");
        if (action == null)
            throw new DataNotFoundException("Action not found");
        ReactionResponse reactionResponse = new ReactionResponse(reaction.getSlug(), reaction.getInputs(user), action.getPlaceholders());
        return ApiResponse.ok(reactionResponse).toResponseEntity();
    }


}
