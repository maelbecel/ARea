package fr.zertus.area.utils;

public class StringUtils {

    public static String slugify(String input) {
        return input.toLowerCase().replaceAll(" ", "-")
            .replaceAll(":", ".")
            .replaceAll("[^a-z0-9-.]", "");
    }

}
