package fr.zertus.area.app.gmail.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class GmailMessage {

    String id;
    String threadId;

}
