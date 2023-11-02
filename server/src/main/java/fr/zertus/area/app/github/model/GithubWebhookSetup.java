package fr.zertus.area.app.github.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
public class GithubWebhookSetup {

    String name;
    boolean active;
    List<String> events;
    Config config;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    @AllArgsConstructor
    public static class Config {
        String url;
        String content_type;
        String insecure_ssl;
    }

}
