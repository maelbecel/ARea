package fr.zertus.area.payload.response;

import fr.zertus.area.utils.FormInput;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
public class ActionResponse {

    String slug;
    List<FormInput> inputs;

}
