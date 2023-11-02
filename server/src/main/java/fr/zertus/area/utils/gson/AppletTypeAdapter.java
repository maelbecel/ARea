package fr.zertus.area.utils.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.utils.FormInput;

import java.io.IOException;

public class AppletTypeAdapter extends TypeAdapter<Applet> {

    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(FormInput.class, new FormInputTypeAdapter())
        .create();

    @Override
    public void write(JsonWriter jsonWriter, Applet applet) throws IOException {
        jsonWriter.beginObject();
        jsonWriter.name("id").value(applet.getId());
        jsonWriter.name("name").value(applet.getName());

        jsonWriter.name("user").beginObject();
        jsonWriter.name("id").value(applet.getUser().getId());
        jsonWriter.name("username").value(applet.getUser().getUsername());
        jsonWriter.name("email").value(applet.getUser().getEmail());
        jsonWriter.endObject();

        jsonWriter.name("actionSlug").value(applet.getActionSlug());
        jsonWriter.name("actionData").beginArray();
        if (applet.getActionData() != null) {
            for (FormInput input : applet.getActionData()) {
                if (input.getType().equals(FormInput.Type.HIDDEN)) continue;
                gson.getAdapter(FormInput.class).write(jsonWriter, input);
            }
        }
        jsonWriter.endArray();

        jsonWriter.name("reactions").beginArray();
        for (Applet.StockReaction stockReaction : applet.getReactions()) {
            jsonWriter.beginObject();
            jsonWriter.name("reactionSlug").value(stockReaction.getReactionSlug());
            jsonWriter.name("reactionData").beginArray();
            if (stockReaction.getReactionData() != null) {
                for (FormInput input : stockReaction.getReactionData()) {
                    if (input.getType().equals(FormInput.Type.HIDDEN)) continue;
                    gson.getAdapter(FormInput.class).write(jsonWriter, input);
                }
            }
            jsonWriter.endArray();
            jsonWriter.endObject();
        }
        jsonWriter.endArray();

        jsonWriter.name("createdAt").value(applet.getCreatedAt().getTime() / 1000);
        if (applet.getLastTriggerDate() != null)
            jsonWriter.name("lastTriggerDate").value(applet.getLastTriggerDate().getTime() / 1000);
        jsonWriter.name("notifUser").value(applet.isNotifUser());
        jsonWriter.name("enabled").value(applet.isEnabled());

        jsonWriter.endObject();
    }

    @Override
    public Applet read(JsonReader jsonReader) throws IOException {
        return null;
    }

}

/*


        jsonWriter.name("actionSlug").value(applet.getActionSlug());
        jsonWriter.name("actionData").beginArray();
        if (applet.getActionData() != null) {
            for (FormInput input : applet.getActionData()) {
                if (input.getType().equals(FormInput.Type.HIDDEN)) continue;
                gson.getAdapter(FormInput.class).write(jsonWriter, input);
            }
        }
        jsonWriter.endArray();

        jsonWriter.name("reactions").beginArray();
        for (Applet.StockReaction stockReaction : applet.getReactions()) {
            jsonWriter.beginObject();
            jsonWriter.name("reactionSlug").value(stockReaction.getReactionSlug());
            jsonWriter.name("reactionData").beginArray();
            if (stockReaction.getReactionData() != null) {
                for (FormInput input : stockReaction.getReactionData()) {
                    if (input.getType().equals(FormInput.Type.HIDDEN)) continue;
                    gson.getAdapter(FormInput.class).write(jsonWriter, input);
                }
            }
            jsonWriter.endArray();
            jsonWriter.endObject();
        }
        jsonWriter.endArray();
*/
