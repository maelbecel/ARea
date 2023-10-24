package fr.zertus.area.app.gmail.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class GmailMail {

    String id;
    Payload payload;
    String historyId;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Payload {
        List<MailHeader> headers;
        List<Part> parts;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Part {
        String partId;
        List<MailHeader> headers;
        Body body;

        @Data
        @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
        public static class Body {
            String data;

            public String getDecodedData() {
                String data = this.data.replace('-', '+').replace('_', '/');
                return new String(java.util.Base64.getDecoder().decode(data));
            }
        }

    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class MailHeader {
        String name;
        String value;
    }

    public String getFromMail() {
        for (MailHeader header : payload.getHeaders()) {
            if (header.getName().equals("From")) {
                String value = header.getValue();
                return value.substring(value.indexOf("<") + 1, value.indexOf(">"));
            }
        }
        return null;
    }

    public String getFromName() {
        for (MailHeader header : payload.getHeaders()) {
            if (header.getName().equals("From")) {
                String value = header.getValue();
                return value.substring(0, value.indexOf("<") - 1);
            }
        }
        return null;
    }

    public String getSubject() {
        for (MailHeader header : payload.getHeaders()) {
            if (header.getName().equals("Subject"))
                return header.getValue();
        }
        return null;
    }

    public String getContent() {
        StringBuilder content = new StringBuilder();
        for (Part part : payload.getParts()) {
            content.append(part.getBody().getDecodedData());
        }
        return content.toString();
    }

}
