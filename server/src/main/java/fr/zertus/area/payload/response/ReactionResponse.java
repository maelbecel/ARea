package fr.zertus.area.payload.response;

import fr.zertus.area.utils.FormInput;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Map;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
public class ReactionResponse {

    String slug;
    List<FormInput> inputs;
    Map<String, String> placeholders;

}
