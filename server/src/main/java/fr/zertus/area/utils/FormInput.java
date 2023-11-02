package fr.zertus.area.utils;

import fr.zertus.area.exception.BadFormInputException;
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

    public boolean isValid() throws BadFormInputException {

        switch (type) {
            case NUMBER -> {
                try {
                    Double.parseDouble(value);
                } catch (NumberFormatException e) {
                    throw new BadFormInputException("The value of the input " + name + " is not a number");
                }
            }
            case SELECT -> {
//                if (options == null || !options.contains(value)) {
//                    throw new BadFormInputException("The value of the input " + name + " is not in the options");
//                }
            }
            case URL -> {
                if (value != null) {
                    if (!value.startsWith("http://") && !value.startsWith("https://")) {
                        throw new BadFormInputException("The value of the input " + name + " is not an url");
                    }
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

    public static FormInput createHiddenInput(String name, String label, String value) {
        FormInput input = createDefaultInput(name, label);
        input.setType(Type.HIDDEN);
        input.setValue(value);
        return input;
    }

    public enum Type {
        TEXT, NUMBER, SELECT, URL, HIDDEN
    }

}
