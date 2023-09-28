package fr.zertus.area.utils.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.utils.FormInput;

import java.io.IOException;

public class ReactionTypeAdapter extends TypeAdapter<Reaction> {

    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(FormInput.class, new FormInputTypeAdapter())
        .create();

    @Override
    public void write(com.google.gson.stream.JsonWriter jsonWriter, Reaction reaction) throws IOException {
        jsonWriter.beginObject();
        jsonWriter.name("name").value(reaction.getName());
        jsonWriter.name("slug").value(reaction.getSlug());
        jsonWriter.name("description").value(reaction.getDescription());
        jsonWriter.name("inputs").beginArray();
        if (reaction.getInputs() != null) {
            for (FormInput input : reaction.getInputs()) {
                gson.getAdapter(FormInput.class).write(jsonWriter, input);
            }
        }
        jsonWriter.endArray();
        jsonWriter.endObject();
    }

    @Override
    public Reaction read(com.google.gson.stream.JsonReader jsonReader) throws IOException {
        return null;
    }

}