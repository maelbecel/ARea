package fr.zertus.area.app.gmail.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.google.GoogleApp;
import fr.zertus.area.app.gmail.utils.EmailCreator;
import fr.zertus.area.app.google.model.GoogleUserInfo;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.service.RegisterUserService;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;

import java.util.List;
import java.util.Map;

public class GmailSendMailReaction extends Reaction {

    public GmailSendMailReaction(String app) {
        super(app, "Send mail", "Send mail to specified address with your google account");

        this.inputs.add(FormInput.createTextInput("to", "Recipient email address"));
        this.inputs.add(FormInput.createTextInput("toName", "Recipient name (to display in your mail client)"));
        this.inputs.add(FormInput.createTextInput("subject", "Subject"));
        this.inputs.add(FormInput.createTextInput("body", "Body"));
    }

    @Override
    public boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException {
        if (user.getConnectedService("google") == null)
            throw new BadFormInputException("Google service is not connected");

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
        GoogleUserInfo userInfo = GoogleApp.getUserInfo(service);
        String destination = FormInputUtils.getValue("to", inputs, parameters);
        String destinationName = FormInputUtils.getValue("toName", inputs, parameters);
        String subject = FormInputUtils.getValue("subject", inputs, parameters);
        String body = FormInputUtils.getValue("body", inputs, parameters);

        String email = EmailCreator.createEmail(destination, destinationName, userInfo.getEmail(), userInfo.getGiven_name(), subject, body);
        String url = "https://www.googleapis.com/upload/gmail/v1/users/me/messages/send";

        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(url, email, String.class, Map.of(
                "Authorization", "Bearer " + user.getConnectedService("google").getToken(),
                "Content-Type", "message/rfc822")
            );

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ReactionTriggerException("Failed to send mail: " + response.getData());
            return true;
        } catch (Exception e) {
            throw new ReactionTriggerException(e.getMessage());
        }
    }

}
