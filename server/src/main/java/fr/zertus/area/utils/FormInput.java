package fr.zertus.area.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

/**
 * This class is used to create a form input
 * It can be used to create a text input, a number input, a select input or an url input
 * It can also be used to check if the input is valid
 */
@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class FormInput {

    String name;
    String label;
    String value;
    List<String> options;
    Type type = Type.TEXT;

    public boolean isValid() {
        if (value == null || value.isEmpty()) {
            return false;
        }

        switch (type) {
            case NUMBER -> {
                try {
                    Integer.parseInt(value);
                } catch (NumberFormatException e) {
                    return false;
                }
            }
            case SELECT -> {
                if (options == null || !options.contains(value)) {
                    return false;
                }
            }
            case URL -> {
                if (!value.startsWith("http://") || !value.startsWith("https://")) {
                    return false;
                }
            }
        }

        return true;
    }

    private static FormInput createDefaultInput(String name, String label) {
        FormInput input = new FormInput();
        input.setName(name);
        input.setLabel(label);
        return input;
    }

    public static FormInput createTextInput(String name, String label) {
        FormInput input = createDefaultInput(name, label);
        input.setType(Type.TEXT);
        return input;
    }

    public static FormInput createNumberInput(String name, String label) {
        FormInput input = createDefaultInput(name, label);
        input.setType(Type.NUMBER);
        return input;
    }

    public static FormInput createSelectInput(String name, String label, List<String> options) {
        FormInput input = createDefaultInput(name, label);
        input.setType(Type.SELECT);
        input.setOptions(options);
        return input;
    }

    public static FormInput createUrlInput(String name, String label) {
        FormInput input = createDefaultInput(name, label);
        input.setType(Type.URL);
        return input;
    }

    public enum Type {
        TEXT, NUMBER, SELECT, URL
    }

}
