package fr.zertus.area.utils.gson;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;

import java.io.IOException;

public class UserTypeAdapter extends TypeAdapter<User> {

    @Override
    public void write(JsonWriter jsonWriter, User user) throws IOException {
        jsonWriter.beginObject();
        jsonWriter.name("id").value(user.getId());
        jsonWriter.name("email").value(user.getEmail());
        jsonWriter.name("username").value(user.getUsername());
        jsonWriter.name("connectedServices").beginArray();
        for (ConnectedService service : user.getConnectedServices()) {
            jsonWriter.value(service.getSlug());
        }
        jsonWriter.endArray();
        jsonWriter.name("passwordLength").value((user.getPassword().length() / 5));
        jsonWriter.endObject();
    }

    @Override
    public User read(JsonReader jsonReader) throws IOException {
        return null;
    }

}
