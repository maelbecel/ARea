package fr.zertus.area.app.google.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class GoogleUserInfo {

    String email;
    String given_name;

}
