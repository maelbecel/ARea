package fr.zertus.area.app.github.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.github.GithubApp;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.service.AuthManagerService;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class GithubCommentIssueReaction extends Reaction {

    public GithubCommentIssueReaction(String app) {
        super(app, "Comment issue", "Comment on an github issue");

        this.inputs.add(FormInput.createSelectInput("repository", "Repository", null));
        this.inputs.add(FormInput.createTextInput("issue_id", "Issue ID"));
        this.inputs.add(FormInput.createTextInput("comment", "Comment"));
    }

    @Override
    public List<FormInput> getInputs(User user) {
        ConnectedService service = AuthManagerService.getConnectedService(user, "github");
        if (service == null)
            return super.getInputs(user);
        List<String> options = GithubApp.getRepositories(service.getToken());
        if (options == null)
            return super.getInputs(user);
        return List.of(FormInput.createSelectInput("repository", "Repository", options),
                FormInput.createTextInput("issue_id", "Issue ID"),
                FormInput.createTextInput("comment", "Comment"));
    }

    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        ConnectedService service = AuthManagerService.getConnectedService(user, "github");
        if (service == null)
            throw new ReactionTriggerException("You must be connected to github to use this reaction");

        String repository = FormInputUtils.getValue("repository", inputs, parameters);
        String issueId = FormInputUtils.getValue("issue_id", inputs, parameters);
        String comment = FormInputUtils.getValue("comment", inputs, parameters);

        String url = "https://api.github.com/repos/" + repository + "/issues/" + issueId + "/comments";

        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(url, new GithubCommentIssueReactionBody(comment), String.class, Map.of(
                "Authorization", "Bearer " + service.getToken(),
                "X-GitHub-Api-Version", "2022-11-28"
            ));
            if (response.getStatus() == 201)
                return true;
            if (response.getStatus() == 403 || response.getStatus() == 401) {
                AuthManagerService.tokenNotValid(user, "github");
                throw new ReactionTriggerException("You don't have the permission to comment on this issue");
            }
            if (response.getStatus() == 404) {
                throw new ReactionTriggerException("The issue " + issueId + " doesn't exist");
            }
            System.out.println(response.getStatus() + " " + response.getMessage() + " " + response.getData());
            throw new ReactionTriggerException("An error occured while sending the request");
        } catch (IOException e) {
            throw new ReactionTriggerException("An error occured while sending the request");
        }
    }

    @Data
    @AllArgsConstructor
    private static class GithubCommentIssueReactionBody {
        private String body;
    }

}
