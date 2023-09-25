package fr.zertus.area.utils.gson;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.sql.Timestamp;

public class CustomTimestampTypeAdapter extends TypeAdapter<Timestamp> {

    @Override
    public void write(JsonWriter jsonWriter, Timestamp timestamp) throws IOException {
        jsonWriter.value(timestamp.getTime() / 1000L); // Timestamp is in milliseconds by default so we divide by 1000 to get seconds
    }

    @Override
    public Timestamp read(JsonReader jsonReader) throws IOException {
        return new Timestamp(jsonReader.nextLong());
    }

}
