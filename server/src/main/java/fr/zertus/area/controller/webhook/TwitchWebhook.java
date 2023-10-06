package fr.zertus.area.controller.webhook;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.twitch.model.TwitchWebhookBody;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.service.ActionReactionService;
import fr.zertus.area.service.AppletService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/webhook/twitch")
@Slf4j
public class TwitchWebhook {

    @Autowired
    private AppletService appletService;

    @Autowired
    private ActionReactionService actionReactionService;

    private static final List<String> messagesId = new ArrayList<>();

    @Hidden
    @PostMapping
    public ResponseEntity<?> twitchWebhook(@RequestHeader Map<String, String> headers, @RequestBody TwitchWebhookBody body) throws BadFormInputException {
        String messageId = headers.get("twitch-eventsub-message-id") == null ? null : headers.get("twitch-eventsub-message-id");
        String type = headers.get("twitch-eventsub-message-type") == null ? null : headers.get("twitch-eventsub-message-type");
        String rawTimestamp = headers.get("twitch-eventsub-message-timestamp") == null ? null : headers.get("twitch-eventsub-message-timestamp");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSSS'Z'");
        Timestamp timestamp;
        try {
            timestamp = new Timestamp(dateFormat.parse(rawTimestamp).getTime());
        } catch (ParseException e) {
            throw new IllegalArgumentException("Fail to parse timestamp");
        }
        if (timestamp.getTime() + 600000 < System.currentTimeMillis()) // If message is older than 10 minutes
            return ApiResponse.gone("Message is too old").toResponseEntity();
        if (type == null || messageId == null)
            return ApiResponse.badRequest("Fail to get type or message Id from headers").toResponseEntity();
        if (messagesId.contains(messageId))
            return ApiResponse.noContent().toResponseEntity();
        messagesId.add(messageId);

        switch (type) {
            case "webhook_callback_verification" -> {
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));
                return new ResponseEntity<>(body.getChallenge(), responseHeaders, HttpStatus.OK);
            }
            case "notification" -> {
                handleNotification(body, body.getSubscription().getType());
                return ResponseEntity.ok().body(ApiResponse.ok("Notification received: " + body.getSubscription().getType()));
            }
            case "revocation" -> {
                return ResponseEntity.ok().body(ApiResponse.ok("Subscription revoked"));
            }
            default -> {
                return ApiResponse.badRequest("Unknown type").toResponseEntity();
            }
        }
    }

    private void handleNotification(TwitchWebhookBody body, String type) throws BadFormInputException {
        switch(type) {
            case "stream.online" -> {
                appletService.triggerAction("twitch.one-stream-start",
                    Map.of("broadcaster_user_id", body.getEvent().getBroadcaster_user_id()),
                    Map.of(
                        "channel", body.getEvent().getBroadcaster_user_name(),
                        "started_at", body.getEvent().getStarted_at(),
                        "link", "https://twitch.tv/" + body.getEvent().getBroadcaster_user_login()
                    )
                );
            }
            default -> {
                log.info("Unknown type: " + type);
            }
        }
    }

}
