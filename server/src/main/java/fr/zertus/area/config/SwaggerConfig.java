package fr.zertus.area.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme().type(SecurityScheme.Type.HTTP)
            .bearerFormat("JWT")
            .scheme("bearer");
    }

    @Bean
    public OpenAPI areaOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Area51")
                .description("Area51 is a web application that allows you to create applets. An applet is a small program that allows you to automate your actions on the web.")
                .version("1.0.0")
                .contact(new Contact()
                    .name("Lucas Dupont")
                    .email("lucas1.dupont@epitech.eu")))
            .externalDocs(new ExternalDocumentation()
                .description("Technical documentation")
                .url("https://github.com/maelbecel/ARea/wiki/Technical-documentation#Server"))
            .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
            .components(new Components().addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
    }

}
