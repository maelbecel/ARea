package fr.zertus.area.app.github.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class GithubWebhookCallback {

    String ref;
    Repository repository;
    HeadCommit head_commit; // For pushes
    Release release; // For releases
    String action; // For issues
    Issue issue;

    @Data
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Repository {
        long id;
        String full_name;
    }

    @Data
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Author {
        String name;
        String email;
        String username;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class HeadCommit {
        String id;
        String message;
        String timestamp;
        String url;
        Author author;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Release {
        String html_url;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Issue {
        String body;
        String created_at;
        Integer number;
        String title;
    }

}
