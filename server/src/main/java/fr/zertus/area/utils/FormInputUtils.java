package fr.zertus.area.utils;

import java.util.List;
import java.util.Map;

public class FormInputUtils {

    public static FormInput getByName(String name, List<FormInput> inputList) {
        return inputList.stream().filter(input -> input.getName().equals(name)).findFirst().orElse(null);
    }

    public static String getValue(String name, List<FormInput> inputList) {
        FormInput input = getByName(name, inputList);
        if (input == null)
            throw new IllegalArgumentException("Input " + name + " not found");
        return input.getValue();
    }

    public static String getValue(String name, List<FormInput> inputList, Map<String, String> placeholders) {
        String input = getValue(name, inputList);
        for (Map.Entry<String, String> entry : placeholders.entrySet())
            input = input.replace("{" + entry.getKey() + "}", entry.getValue());
        return input;
    }

}
