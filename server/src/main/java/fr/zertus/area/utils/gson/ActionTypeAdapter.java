package fr.zertus.area.utils.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import fr.zertus.area.app.Action;
import fr.zertus.area.utils.FormInput;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

public class ActionTypeAdapter extends TypeAdapter<Action> {

    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(FormInput.class, new FormInputTypeAdapter())
        .create();

    @Override
    public void write(JsonWriter jsonWriter, Action action) throws IOException {
        jsonWriter.beginObject();
        jsonWriter.name("name").value(action.getName());
        jsonWriter.name("slug").value(action.getSlug());
        jsonWriter.name("description").value(action.getDescription());
        jsonWriter.name("inputs").beginArray();
        if (action.getInputs() != null) {
            for (FormInput input : action.getInputs()) {
                gson.getAdapter(FormInput.class).write(jsonWriter, input);
            }
        }
        jsonWriter.endArray();
        jsonWriter.endObject();
    }

    @Override
    public Action read(JsonReader jsonReader) throws IOException {
        return null;
    }

}
