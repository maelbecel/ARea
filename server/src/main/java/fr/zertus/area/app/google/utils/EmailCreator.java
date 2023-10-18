package fr.zertus.area.app.google.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class EmailCreator {

    public static String createEmail(String to, String from, String subject, String body) {
        return "To: " + to + "\n" +
            "From: " + from + "\n" +
            "Subject: " + subject + "\n" +
            "Content-Type: text/plain; charset=\"UTF-8\"" + "\n" +
            "Date: " + new SimpleDateFormat("dd MM yyyy").format(new Date(System.currentTimeMillis())) + "\n" +
            "Message-ID: <" + System.currentTimeMillis() + "@area.zertus.fr>" + "\n" +
            "\n" +
            body;
    }

    public static String toBase64(String mail) {
        String base64 = java.util.Base64.getEncoder().encodeToString(mail.getBytes());
        return base64.replaceAll("\\+", "-").replaceAll("/", "_");
    }

}
