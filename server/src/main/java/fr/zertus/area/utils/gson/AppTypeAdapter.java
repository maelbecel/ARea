package fr.zertus.area.utils.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.gson.GsonBuilderCustomizer;

import java.io.IOException;

public class AppTypeAdapter extends TypeAdapter<App> {

    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(Action.class, new ActionTypeAdapter())
        .create();

    @Override
    public void write(JsonWriter jsonWriter, App app) throws IOException {
        jsonWriter.beginObject();
        jsonWriter.name("name").value(app.getName());
        jsonWriter.name("slug").value(app.getSlug());
        jsonWriter.name("actions").beginArray();
        if (app.getActions() != null) {
            for (Action action : app.getActions()) {
                gson.getAdapter(Action.class).write(jsonWriter, action);
            }
        }
        jsonWriter.endArray();
        jsonWriter.name("reactions").beginArray();
        jsonWriter.endArray();
        jsonWriter.name("decoration").beginObject();
        jsonWriter.name("logoUrl").value(app.getDecoration().getLogoUrl());
        jsonWriter.name("backgroundColor").value(app.getDecoration().getBackgroundColor());
        jsonWriter.endObject();
        jsonWriter.endObject();
    }

    @Override
    public App read(JsonReader jsonReader) throws IOException {
        return null;
    }

}
