package fr.zertus.area.controller.webhook;

import fr.zertus.area.app.github.model.GithubWebhookCallback;
import fr.zertus.area.service.AppletService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/webhook/github")
@Slf4j
public class GithubWebhook {

    @Autowired
    private AppletService appletService;

    @PostMapping
    @Hidden
    public ResponseEntity<?> githubWebhook(@RequestHeader Map<String, String> headers, @RequestBody GithubWebhookCallback body) {
        String event = (headers.get("x-github-event") == null) ? null : headers.get("x-github-event");

        if (event == null)
            return ResponseEntity.badRequest().build();
        if (event.equals("ping"))
            return ResponseEntity.ok().build();
        if (event.equals("push") && body.getRepository() != null && body.getHead_commit() != null) { // Github push on repo
            appletService.triggerAction("github.push-on-repo",
                Map.of("repository", body.getRepository().getFull_name()),
                Map.of("author", body.getHead_commit().getAuthor().getName(),
                    "message", body.getHead_commit().getMessage(),
                    "repository", body.getRepository().getFull_name()));
        }
        if (event.equals("release") && body.getRepository() != null) {
            appletService.triggerAction("github.release-on-repo",
                Map.of("repository", body.getRepository().getFull_name()),
                Map.of("release_url", body.getRelease().getHtml_url(),
                    "repository", body.getRepository().getFull_name()));
        }
        if (event.equals("issues") && body.getIssue() != null && body.getAction() != null && body.getAction().equalsIgnoreCase("opened")) {
            appletService.triggerAction("github.issue-opened-on-repo",
                Map.of("repository", body.getRepository().getFull_name()),
                Map.of("issue_body", body.getIssue().getBody(),
                    "issue_id", body.getIssue().getNumber().toString(),
                    "issue_url", "https://github.com/" + body.getRepository().getFull_name() + "/issues/" + body.getIssue().getNumber(),
                    "repository", body.getRepository().getFull_name(),
                    "issue_title", body.getIssue().getTitle()));
        }

        return ResponseEntity.ok().build();
    }
    
}
