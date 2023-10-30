package fr.zertus.area.service;

import com.google.gson.annotations.SerializedName;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class MailNotificationService {

    public void sendAppletTriggerMail(String email, String username, String appletName) {
        sendMail(new Mail(
            "no-reply@zertus.fr",
            "Area51",
            "Your applet " + appletName + " has been triggered",
            "Hi " + username + ", your applet " + appletName + " has been triggered with success ! It's time to celebrate !",
            "<h3>Hi " + username + ",<br> Your applet <strong>" + appletName + "</strong> has been triggered with success !</h3><h5><strong>It's time to celebrate !</strong></h5>",
            List.of(new Mail.Recipient(email))
        ));
    }

    public void sendAuthErrorMail(String email, String appName) {
        sendMail(new Mail(
            "no-reply@zertus.fr",
            "Area51",
            "Error with your " + appName + " account",
            "Hey, we can't connect to your " + appName + " account. It could be because of an update you made, or improvements on the service’s end. We invite you to reconnect your " + appName + " account on Area51.",
            "<h3>Hey !</h3><br /><br /><h6>We can't connect to your <strong>" + appName + "</strong> account.</h6><br><h6>" +
                "It could be because of an update you made, or improvements on the service’s end.</h6><br /><h6>We invite you to reconnect your <strong>" + appName + "</strong> account on Area51.</h6>" +
                "<h3><a href=\"https://area51.zertus.fr\">Click here to fix that !</a></h3>",
            List.of(new Mail.Recipient(email))
        ));
    }

    /**
     * PART TO SEND GENERIC MAIL
     */

    @Value("${mailjet.api-key}")
    private String apiKey;
    @Value("${mailjet.api-secret}")
    private String secretKey;

    private void sendMail(Mail mail) {
        String url = "https://api.mailjet.com/v3/send";

        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(url, mail, String.class, Map.of(
               "Authorization", "Basic " + Base64.getEncoder().encodeToString((apiKey + ":" + secretKey).getBytes())
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new Exception(response.getData());
        } catch (Exception e) {
            log.error("Error while sending mail: " + e.getMessage());
        }
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    @AllArgsConstructor
    private static class Mail {
        String FromEmail;
        String FromName;
        String Subject;
        @SerializedName("Text-part") String Text;
        @SerializedName("Html-part") String Html;
        List<Recipient> Recipients;

        @Data
        @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
        @AllArgsConstructor
        private static class Recipient {
            String Email;
        }
    }

}
