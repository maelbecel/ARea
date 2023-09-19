package fr.zertus.area.service;

import fr.zertus.area.app.App;
import fr.zertus.area.app.github.GithubApp;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AppService {

    private static Map<String, App> apps = new HashMap<>();
    static {
        GithubApp githubApp = new GithubApp();
        apps.put(githubApp.getSlug(), githubApp);
    }

    public App getApp(String slug) {
        return apps.get(slug);
    }

}
