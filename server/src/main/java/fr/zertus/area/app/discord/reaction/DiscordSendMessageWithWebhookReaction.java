package fr.zertus.area.app.discord.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.discord.model.DiscordWebhookMessage;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;

import java.util.List;
import java.util.Map;

public class DiscordSendMessageWithWebhookReaction extends Reaction {

    public DiscordSendMessageWithWebhookReaction(String app) {
        super(app, "Send message in channel", "Send a message in a channel with a webhook");

        this.inputs.add(FormInput.createTextInput("webhook", "Webhook URL"));
        this.inputs.add(FormInput.createTextInput("username", "Username to display"));
        this.inputs.add(FormInput.createTextInput("message", "Message to send"));
    }

    @Override
    public List<FormInput> getInputs(User user) {
        return super.getInputs(user);
    }

    @Override
    public boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException {
        super.setupReaction(user, inputs);

        String webhook = FormInputUtils.getValue("webhook", inputs);
        if (!webhook.contains("https://discord.com/api/webhooks"))
            throw new BadFormInputException("Webhook URL is not valid");
        return true;
    }

    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws BadFormInputException {
        super.trigger(user, inputs, parameters);

        String message = FormInputUtils.getValue("message", inputs);
        for (Map.Entry<String, String> entry : parameters.entrySet())
            message = message.replace("{" + entry.getKey() + "}", entry.getValue());

        String webhook = FormInputUtils.getValue("webhook", inputs);
        String username = FormInputUtils.getValue("username", inputs);

        DiscordWebhookMessage webhookMessage = new DiscordWebhookMessage(message, username, "");
        return webhookMessage.send(webhook);
    }

}
