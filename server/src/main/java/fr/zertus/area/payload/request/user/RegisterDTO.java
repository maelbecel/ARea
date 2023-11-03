package fr.zertus.area.payload.request.user;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class RegisterDTO {

    String email;
    String username;
    String password;
    String currentPassword;
    String newPassword;

}
