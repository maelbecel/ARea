package fr.zertus.area.config;

import fr.zertus.area.utils.gson.CustomTimestampTypeAdapter;
import org.springframework.boot.autoconfigure.gson.GsonBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Timestamp;

@Configuration
public class GsonConfiguration {

    @Bean
    public GsonBuilderCustomizer typeAdapterRegistration() {
        return builder -> {
            builder.registerTypeAdapter(Timestamp.class, new CustomTimestampTypeAdapter());
        };
    }

}
