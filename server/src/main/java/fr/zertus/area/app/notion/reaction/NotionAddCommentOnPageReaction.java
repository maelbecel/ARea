package fr.zertus.area.app.notion.reaction;

import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.notion.model.NotionRichText;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

public class NotionAddCommentOnPageReaction extends Reaction {

    public NotionAddCommentOnPageReaction(String app) {
        super(app, "Add comment on page", "Add comment on a specific page on your Notion account");

        this.inputs.add(FormInput.createTextInput("page_id", "Page ID (example: 5f2f3b3b0d6047768ea9b2d017d8d14e)"));
        this.inputs.add(FormInput.createTextInput("comment", "Comment to add"));
    }

    @Override
    public boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException {
        ConnectedService service = user.getConnectedService("notion");
        if (service == null) {
            throw new BadFormInputException("You need to connect your Notion account before using this reaction");
        }
        String pageId = FormInputUtils.getValue("page_id", inputs);
        String url = "https://api.notion.com/v1/pages/" + pageId;

        try {
            ApiResponse<String> response = BasicApiClient.sendGetRequest(url, String.class, Map.of(
                "Authorization", "Bearer " + service.getToken(),
                "Notion-Version", "2022-06-28"
            ));

            if (response.getStatus() != 200) {
                throw new BadFormInputException("Invalid page ID");
            }
        } catch (Exception e) {
            throw new BadFormInputException("Invalid page ID");
        }
        return true;
    }

    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        ConnectedService service = user.getConnectedService("notion");
        if (service == null) {
            throw new ReactionTriggerException("You need to connect your Notion account before using this reaction");
        }
        String pageId = FormInputUtils.getValue("page_id", inputs);
        String url = "https://api.notion.com/v1/comments";
        String comment = FormInputUtils.getValue("comment", inputs, parameters);
        NotionRichText richText = new NotionRichText();
        richText.setText(new NotionRichText.NotionRichTextText(comment, null));
        richText.setType("text");
        NotionCommentBody body = new NotionCommentBody(new NotionCommentBody.Parent(pageId), List.of(richText));

        try {
            ApiResponse<String> response = BasicApiClient.sendPostRequest(url, body, String.class, Map.of(
                "Authorization", "Bearer " + service.getToken(),
                "Notion-Version", "2022-06-28"
            ));

            if (response.getStatus() != 200) {
                throw new ReactionTriggerException("An error occurred while adding comment");
            }
        } catch (Exception e) {
            throw new ReactionTriggerException(e.getMessage());
        }

        return true;
    }

    @Data
    @AllArgsConstructor
    private static class NotionCommentBody {

        private Parent parent;
        private List<NotionRichText> rich_text;

        @Data
        @AllArgsConstructor
        private static class Parent {
            private String page_id;
        }

    }
}
