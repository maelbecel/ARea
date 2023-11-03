package fr.zertus.area.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexUtils {

    public static String extractValue(String input, String pattern) {
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(input);

        if (m.find()) {
            return m.group(1); // Capture group (1) contains the matched value
        }
        return null; // Return null if no match found
    }

}
