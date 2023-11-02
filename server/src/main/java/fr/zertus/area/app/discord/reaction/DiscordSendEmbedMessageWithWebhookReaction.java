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

public class DiscordSendEmbedMessageWithWebhookReaction extends Reaction {

    public DiscordSendEmbedMessageWithWebhookReaction(String app) {
        super(app, "Send embed message in channel", "Send a message in a channel with a webhook");

        this.inputs.add(FormInput.createUrlInput("webhook", "Webhook URL"));
        this.inputs.add(FormInput.createTextInput("username", "Username to display"));

        this.inputs.add(FormInput.createTextInput("author_name", "Author name (optional)"));
        this.inputs.add(FormInput.createUrlInput("author_url", "Author URL (optional)"));
        this.inputs.add(FormInput.createUrlInput("author_icon_url", "Author icon URL (optional)"));

        this.inputs.add(FormInput.createTextInput("title", "Title"));
        this.inputs.add(FormInput.createTextInput("body", "Body"));
        this.inputs.add(FormInput.createSelectInput("color", "Color", List.of(
            "RED",
            "BLUE",
            "GREEN",
            "YELLOW",
            "PURPLE",
            "ORANGE",
            "BLACK",
            "WHITE"
        )));

        this.inputs.add(FormInput.createUrlInput("image_url", "Image URL (optional)"));
        this.inputs.add(FormInput.createUrlInput("thumbnail_url", "Thumbnail URL (optional)"));

        this.inputs.add(FormInput.createTextInput("footer_text", "Footer text (optional)"));
        this.inputs.add(FormInput.createUrlInput("footer_icon_url", "Footer icon URL (optional)"));
        this.inputs.add(FormInput.createSelectInput("footer_date", "Add footer date", List.of(
            "Yes",
            "No"
        )));
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
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        super.trigger(user, inputs, parameters);

        String webhook = FormInputUtils.getValue("webhook", inputs, parameters);
        String username = FormInputUtils.getValue("username", inputs, parameters);

        String title = FormInputUtils.getValue("title", inputs, parameters);
        String body = FormInputUtils.getValue("body", inputs, parameters);
        String color = FormInputUtils.getValue("color", inputs, parameters);
        long colorLong = getColor(color);

        DiscordWebhookMessage.Author author = null;
        try {
            String authorName = FormInputUtils.getValue("author_name", inputs, parameters);
            String authorUrl = FormInputUtils.getValue("author_url", inputs, parameters);
            String authorIconUrl = FormInputUtils.getValue("author_icon_url", inputs, parameters);
            author = new DiscordWebhookMessage.Author(authorName, authorUrl, authorIconUrl);
        } catch (IllegalArgumentException e){}

        DiscordWebhookMessage.Image image = null;
        try {
            String imageUrl = FormInputUtils.getValue("image_url", inputs, parameters);
            image = new DiscordWebhookMessage.Image(imageUrl);
        } catch (IllegalArgumentException e){}

        DiscordWebhookMessage.Image thumbnail = null;
        try {
            String thumbnailUrl = FormInputUtils.getValue("thumbnail_url", inputs, parameters);
            thumbnail = new DiscordWebhookMessage.Image(thumbnailUrl);
        } catch (IllegalArgumentException e){}

        DiscordWebhookMessage.Footer footer = null;
        try {
            String footerText = FormInputUtils.getValue("footer_text", inputs, parameters);
            String footerIconUrl = FormInputUtils.getValue("footer_icon_url", inputs, parameters);
            footer = new DiscordWebhookMessage.Footer(footerText, footerIconUrl);
        } catch (IllegalArgumentException e){}

        // TODO: Add date to footer

        DiscordWebhookMessage.Embed embed = new DiscordWebhookMessage.Embed(title, body, "", colorLong, "", footer, image, thumbnail, author);
        DiscordWebhookMessage webhookMessage = new DiscordWebhookMessage(null, username,  null, embed);
        return webhookMessage.send(webhook);
    }

    private long getColor(String color) {
        switch (color) {
            case "RED" -> {return 13632027;}
            case "BLUE" -> {return 3447003;}
            case "GREEN" -> {return 3066993;}
            case "YELLOW" -> {return 15105570;}
            case "PURPLE" -> {return 10181046;}
            case "ORANGE" -> {return 15158332;}
            case "WHITE" -> {return 16777215;}
            default -> {return 0;}
        }
    }

}
