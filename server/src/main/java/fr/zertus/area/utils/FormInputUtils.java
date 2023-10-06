package fr.zertus.area.utils;

import java.util.List;

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

}
