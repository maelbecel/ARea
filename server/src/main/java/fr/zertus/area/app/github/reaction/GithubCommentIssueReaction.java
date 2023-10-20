package fr.zertus.area.app.github.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.github.GithubApp;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;

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
        ConnectedService service = user.getConnectedService("github");
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
    public boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException {
        String issueId = FormInputUtils.getValue("issue_id", inputs);
        try {
            long id = Long.parseLong(issueId);
        } catch (NumberFormatException e) {
            throw new BadFormInputException("The issue id must be a number");
        }
        return super.setupReaction(user, inputs);
    }

    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        ConnectedService service = user.getConnectedService("github");
        if (service == null)
            throw new ReactionTriggerException("You must be connected to github to use this reaction");

        String repository = FormInputUtils.getValue("repository", inputs, parameters);
        String issueId = FormInputUtils.getValue("issue_id", inputs, parameters);
        String comment = FormInputUtils.getValue("comment", inputs, parameters);

        String url = "https://api.github.com/repos/" + repository + "/issues/" + issueId + "/comments";
        String body = "{\"body\": \"" + comment + "\"}";

        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(url, body, String.class, Map.of(
                "Authorization", "Bearer " + service.getToken(),
                "X-GitHub-Api-Version", "2022-11-28"
            ));
            if (response.getStatus() == 201)
                return true;
            if (response.getStatus() == 403) {
                throw new ReactionTriggerException("You don't have the permission to comment on this issue");
            }
            if (response.getStatus() == 404) {
                throw new ReactionTriggerException("The issue " + issueId + " doesn't exist");
            }
            throw new ReactionTriggerException("An error occured while sending the request");
        } catch (IOException e) {
            throw new ReactionTriggerException("An error occured while sending the request");
        }
    }

}
