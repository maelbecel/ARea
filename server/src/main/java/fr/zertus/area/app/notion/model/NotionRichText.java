package fr.zertus.area.app.notion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class NotionRichText {

    private String type;
    private NotionRichTextText text;
    private NotionRichTextAnnotations annotations;
    private String plain_text;
    private String href;

    @Data
    @AllArgsConstructor
    public static class NotionRichTextText {
        private String content;
        private String link;
    }

    @Data
    public static class NotionRichTextAnnotations {
        private boolean bold;
        private boolean italic;
        private boolean strikethrough;
        private boolean underline;
        private boolean code;
        private String color;
    }

}
