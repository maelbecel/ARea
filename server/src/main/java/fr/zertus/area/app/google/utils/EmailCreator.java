package fr.zertus.area.app.google.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class EmailCreator {

    public static String createEmail(String to, String toName, String from, String fromName, String subject, String body) {
        return
            "From: " + fromName + " <" + from + ">\n" +
            "To: " + toName + " <" + to + ">\n" +
            "Subject: " + subject + "\n" +
            "Content-Type: text/plain; charset=\"UTF-8\"" + "\n" +
            "Date: " + new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z").format(new Date()) + "\n" +
            "Message-ID: <" + System.currentTimeMillis() + "@area.zertus.fr>" + "\n" +
            "\n" +
            body;
    }

}
