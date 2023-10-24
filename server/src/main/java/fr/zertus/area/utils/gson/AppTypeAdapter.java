package fr.zertus.area.utils.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;

import java.io.IOException;

public class AppTypeAdapter extends TypeAdapter<App> {

    private final Gson gson = new GsonBuilder()
        .registerTypeAdapter(Action.class, new ActionTypeAdapter())
        .registerTypeAdapter(Reaction.class, new ReactionTypeAdapter())
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
        if (app.getReactions() != null) {
            for (Reaction reaction : app.getReactions()) {
                gson.getAdapter(Reaction.class).write(jsonWriter, reaction);
            }
        }
        jsonWriter.endArray();
        jsonWriter.name("decoration").beginObject();
        jsonWriter.name("logoUrl").value(app.getDecoration().getLogoUrl());
        jsonWriter.name("backgroundColor").value(app.getDecoration().getBackgroundColor());
        jsonWriter.name("description").value(app.getDecoration().getDescription());
        jsonWriter.name("websiteUrl").value(app.getDecoration().getLinkUrl());
        jsonWriter.endObject();
        jsonWriter.endObject();
    }

    @Override
    public App read(JsonReader jsonReader) throws IOException {
        return null;
    }

}
