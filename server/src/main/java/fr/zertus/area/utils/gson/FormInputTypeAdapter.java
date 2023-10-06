package fr.zertus.area.utils.gson;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;
import fr.zertus.area.utils.FormInput;

import java.io.IOException;

public class FormInputTypeAdapter extends TypeAdapter<FormInput> {

    @Override
    public void write(JsonWriter jsonWriter, FormInput input) throws IOException {
        jsonWriter.beginObject();
        jsonWriter.name("name").value(input.getName());
        jsonWriter.name("label").value(input.getLabel());
        jsonWriter.name("type").value(input.getType().name());
        jsonWriter.name("value").value(input.getValue());
        if (input.getOptions() != null && !input.getOptions().isEmpty()) {
            jsonWriter.name("options").beginArray();
            for (String option : input.getOptions())
                jsonWriter.value(option);
            jsonWriter.endArray();
        }
        jsonWriter.endObject();
    }

    @Override
    public FormInput read(JsonReader jsonReader) throws IOException {
        FormInput input = new FormInput();

        jsonReader.beginObject();
        while (jsonReader.hasNext() && !jsonReader.peek().equals(JsonToken.END_OBJECT)) {
            switch (jsonReader.nextName()) {
                case "name":
                    input.setName(jsonReader.nextString());
                    break;
                case "label":
                    input.setLabel(jsonReader.nextString());
                    break;
                case "type":
                    input.setType(FormInput.Type.valueOf(jsonReader.nextString()));
                    break;
                case "value":
                    input.setValue(jsonReader.nextString());
                    break;
                case "options":
                    jsonReader.beginArray();
                    while (jsonReader.hasNext() && !jsonReader.peek().equals(JsonToken.END_ARRAY))
                        input.getOptions().add(jsonReader.nextString());
                    jsonReader.endArray();
                    break;
                default:
                    jsonReader.skipValue();
                    break;
            }
        }
        jsonReader.endObject();

        return input;
    }

}
