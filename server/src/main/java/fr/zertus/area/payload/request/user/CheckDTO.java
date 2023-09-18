package fr.zertus.area.payload.request.user;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CheckDTO {

    String token;

}
