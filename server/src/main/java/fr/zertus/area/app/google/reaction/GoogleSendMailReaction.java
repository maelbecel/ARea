package fr.zertus.area.app.google.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.google.utils.EmailCreator;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.service.RegisterUserService;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

public class GoogleSendMailReaction extends Reaction {

    public GoogleSendMailReaction(String app) {
        super(app, "Send mail", "Send mail to specified address with your google account");

        this.inputs.add(FormInput.createTextInput("to", "To"));
        this.inputs.add(FormInput.createTextInput("subject", "Subject"));
        this.inputs.add(FormInput.createTextInput("body", "Body"));
    }

    @Override
    public boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException {
        String email = FormInputUtils.getValue("to", inputs);
        if (!RegisterUserService.isEmailValid(email))
            throw new BadFormInputException("Email is not valid");

        String subject = FormInputUtils.getValue("subject", inputs);
        if (subject.isEmpty())
            throw new BadFormInputException("Subject is empty");
        return super.setupReaction(user, inputs);
    }

    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        ConnectedService service = user.getConnectedService("google");
        if (service == null)
            throw new ReactionTriggerException("Google service is not connected");
        String email = FormInputUtils.getValue("to", inputs, parameters);
        String subject = FormInputUtils.getValue("subject", inputs, parameters);
        String body = FormInputUtils.getValue("body", inputs, parameters);

        String formatedEmail = EmailCreator.createEmail(email, "zertus2001@gmail.com", subject, body);
        String base64 = EmailCreator.toBase64(formatedEmail);
        String url = "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send";

        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(url, new Email(base64), String.class, Map.of(
                "Authorization", "Bearer " + user.getConnectedService("google").getToken(),
                "Content-Type", "message/rfc822")
            );

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ReactionTriggerException("Failed to send mail: " + response.getMessage());
            return true;
        } catch (Exception e) {
            throw new ReactionTriggerException("Failed to send mail");
        }
    }

    @Data
    @AllArgsConstructor
    public static class Email {
        private String raw;
    }

}
