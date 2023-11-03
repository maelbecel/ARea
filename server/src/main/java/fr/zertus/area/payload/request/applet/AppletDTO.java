package fr.zertus.area.payload.request.applet;

import fr.zertus.area.utils.FormInput;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AppletDTO {

    String name;
    String actionSlug;
    List<FormInput> actionInputs;
    List<StockReactionDto> reactions;
    Boolean notifUser;
    Boolean enabled;

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class StockReactionDto {
        String reactionSlug;
        List<FormInput> reactionInputs;
    }

}
