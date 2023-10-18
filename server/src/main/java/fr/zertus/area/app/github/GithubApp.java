package fr.zertus.area.app.github;

import com.google.gson.Gson;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.github.action.GithubOpenIssueOnRepoAction;
import fr.zertus.area.app.github.action.GithubPushOnRepoAction;
import fr.zertus.area.app.github.action.GithubReleaseOnRepoAction;
import fr.zertus.area.app.github.model.GithubRepository;
import fr.zertus.area.app.github.model.GithubWebhookSetup;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.oauth2.OAuth2CodeAuthorizationHandler;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GithubApp extends App {

    private static OAuth2CodeAuthorizationHandler handler = new GithubOAuth2Handler();

    @Override
    public String getName() {
        return "Github";
    }

    @Override
    public String getSlug() {
        return "github";
    }

    @Override
    public List<Action> getActions() {
        return List.of(new GithubPushOnRepoAction(getName()),
            new GithubReleaseOnRepoAction(getName()),
            new GithubOpenIssueOnRepoAction(getName()));
    }

    @Override
    public List<Reaction> getReactions() {
        return new ArrayList<>();
    }

    @Override
    public boolean isOAuth2() {
        return true;
    }

    @Override
    public OAuth2CodeAuthorizationHandler getOAuth2Handler() {
        return handler;
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration("https://i.imgur.com/dy2uNAS.png", "#1B1F23");
    }

    /*
     * Some useful functions to all actions/reactions
     */
    public static List<String> getRepositories(String token) {
        String url = "https://api.github.com/user/repos?visibility=all&affiliation=owner&per_page=100";
        try {
            ApiResponse<String> response = BasicApiClient.sendGetRequest(url, String.class, Map.of(
                "Authorization", "Bearer " + token,
                "X-GitHub-Api-Version", "2022-11-28"));

            if (response.getStatus() >= 200 && response.getStatus() < 300) {
                Type listType = new com.google.gson.reflect.TypeToken<List<GithubRepository>>(){}.getType();
                List<GithubRepository> repositories = new Gson().fromJson(response.getData(), listType);

                List<String> options = new ArrayList<>();
                for (GithubRepository repository : repositories)
                    options.add(repository.getFull_name());
                return options;
            }
            return null;
        } catch (IOException e) {
            return null;
        }
    }

    public static void setupWebhook(String url, String token, GithubWebhookSetup body) throws ActionTriggerException {
        try {
            ApiResponse<GithubWebhookSetupCallback> response = BasicApiClient.sendPostRequest(url, body, GithubWebhookSetupCallback.class, Map.of(
                "Authorization", "Bearer " + token,
                "X-GitHub-Api-Version", "2022-11-28")
            );

            if ((response.getStatus() < 200 || response.getStatus() >= 300)) {
                if (response.getData() != null && response.getData().getErrors() != null && !response.getData().getErrors().isEmpty()) {
                    GithubWebhookSetupCallback.Error error = response.getData().getErrors().get(0);
                    if (error.getMessage().contains("Hook already exists on this repository"))
                        return;
                }
                throw new ActionTriggerException("Error while setting up webhook: " + response.getMessage());
            }
        } catch (IOException e) {
            throw new ActionTriggerException("Error while setting up webhook: " + e.getMessage());
        }
    }

    @Data
    private static class GithubWebhookSetupCallback {
        private String message;
        private List<Error> errors;

        @Data
        private static class Error {
            private String resource;
            private String code;
            private String message;
        }
    }

}
