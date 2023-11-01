package fr.zertus.area.app.github.action;

import com.google.gson.Gson;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.github.GithubApp;
import fr.zertus.area.app.github.model.GithubRepository;
import fr.zertus.area.app.github.model.GithubWebhookSetup;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.service.AuthManagerService;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import fr.zertus.area.utils.IPGetter;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GithubOpenIssueOnRepoAction extends Action {

    public GithubOpenIssueOnRepoAction(String appName) {
        super(appName,"Issue opened on repo", "When an issue is opened on a selected repository");

        this.inputs.add(FormInput.createSelectInput("repository", "Repository", new ArrayList<>()));

        this.placeholders.put("repository", "Repository");
        this.placeholders.put("issue_title", "Issue title");
        this.placeholders.put("issue_body", "Issue body");
        this.placeholders.put("issue_id", "Issue ID");
        this.placeholders.put("issue_url", "Issue URL");
    }

    @Override
    public List<FormInput> getInputs(User user) {
        ConnectedService service = AuthManagerService.getConnectedService(user, "github");
        if (service == null)
            return super.getInputs(user);
        List<String> options = GithubApp.getRepositories(service.getToken());
        if (options == null)
            return super.getInputs(user);
        return List.of(FormInput.createSelectInput("repository", "Repository", options));
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        ConnectedService service = AuthManagerService.getConnectedService(user, "github");
        if (service == null)
            throw new ActionTriggerException("You need to connect your Github account first");
        String input = FormInputUtils.getValue("repository", inputs);
        String url = "https://api.github.com/repos/" + input + "/hooks";
        GithubWebhookSetup body = new GithubWebhookSetup("web", true, List.of("issues"),
            new GithubWebhookSetup.Config(IPGetter.getServerBaseAddress() + "/webhook/github", "json", "0"));

        GithubApp.setupWebhook(url, service.getToken(), body, user);
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        String repoName = FormInputUtils.getValue("repository", inputs);
        String repoNameFromValues = values.get("repository");
        return repoName.equalsIgnoreCase(repoNameFromValues);
    }

}
