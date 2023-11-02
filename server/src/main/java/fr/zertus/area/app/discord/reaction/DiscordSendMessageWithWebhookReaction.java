package fr.zertus.area.app.discord.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.discord.model.DiscordWebhookMessage;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;

import java.util.List;
import java.util.Map;

public class DiscordSendMessageWithWebhookReaction extends Reaction {

    public DiscordSendMessageWithWebhookReaction(String app) {
        super(app, "Send message in channel", "Send a message in a channel with a webhook");

        this.inputs.add(FormInput.createUrlInput("webhook", "Webhook URL"));
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

        String content = FormInputUtils.getValue("message", inputs);
        if (content.length() > 1200)
            throw new BadFormInputException("Message is too long (max 1200 characters)");

        return true;
    }

    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        super.trigger(user, inputs, parameters);

        String message = FormInputUtils.getValue("message", inputs, parameters);
        String webhook = FormInputUtils.getValue("webhook", inputs, parameters);
        String username = FormInputUtils.getValue("username", inputs, parameters);

        DiscordWebhookMessage webhookMessage = new DiscordWebhookMessage(message, username, "");
        return webhookMessage.send(webhook);
    }

}
