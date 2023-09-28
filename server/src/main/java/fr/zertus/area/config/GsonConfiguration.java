package fr.zertus.area.config;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.User;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.gson.*;
import org.springframework.boot.autoconfigure.gson.GsonBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.Timestamp;

@Configuration
public class GsonConfiguration {

    @Bean
    public GsonBuilderCustomizer gsonBuilderCustomizer() {
        return builder -> {
            builder.registerTypeAdapter(Timestamp.class, new CustomTimestampTypeAdapter());
            builder.registerTypeAdapter(User.class, new UserTypeAdapter());
            builder.registerTypeAdapter(FormInput.class, new FormInputTypeAdapter());
            builder.registerTypeAdapter(Action.class, new ActionTypeAdapter());
            builder.registerTypeAdapter(Reaction.class, new ReactionTypeAdapter());
            builder.registerTypeAdapter(App.class, new AppTypeAdapter());
        };
    }

}
