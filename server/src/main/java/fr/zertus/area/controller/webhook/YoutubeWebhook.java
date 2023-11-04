package fr.zertus.area.controller.webhook;

import fr.zertus.area.app.youtube.model.YoutubeNewVideoFeed;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.service.AppletService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.xml.bind.JAXB;
import jakarta.xml.bind.JAXBException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.xml.Jaxb2XmlDecoder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/webhook/youtube")
@Slf4j
public class YoutubeWebhook {

    @Autowired
    private AppletService appletService;

    @PostMapping
    @Hidden
    public ResponseEntity<?> handleWebhook(@RequestBody String body) throws JAXBException {
        log.info("Youtube webhook: {}", body);
        body = body.replaceFirst(".*?<entry>", "<entry>");
        body = body.replaceFirst("</entry>.*", "</entry>");

        String entryTitle = extractValue(body, "<title>(.*?)</title>");
        String entryChannelId = extractValue(body, "<yt:channelId>(.*?)</yt:channelId>");
        String entryAuthorName = extractValue(body, "<name>(.*?)</name>");
        String entryLink = extractValue(body, "<link rel=\"alternate\" href=\"(.*?)\"/>");

        if (entryTitle == null || entryChannelId == null || entryAuthorName == null || entryLink == null)
            return ApiResponse.badRequest("Invalid request body").toResponseEntity();

        appletService.triggerAction("youtube.new-video", Map.of(
            "channel_id", entryChannelId), Map.of(
                "video_title", entryTitle,
                "channel_name", entryAuthorName,
                "video_url", entryLink
        ));
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Hidden
    public ResponseEntity<?> handleWebhookChallenge(@RequestParam(name="hub.challenge") String challenge) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));
        return new ResponseEntity<>(challenge, responseHeaders, HttpStatus.OK);
    }

    private static String extractValue(String input, String pattern) {
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(input);

        if (m.find()) {
            return m.group(1); // Capture group (1) contains the matched value
        }
        return null; // Return null if no match found
    }

}
