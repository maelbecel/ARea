package fr.zertus.area.app;

import fr.zertus.area.entity.User;
import fr.zertus.area.utils.FormInput;

import java.util.List;
import java.util.Map;

public interface IAction {

    String getName();
    String getSlug();
    String getDescription();
    List<FormInput> getInputs();
    List<FormInput> getInputs(User user);
    Map<String, String> getPlaceholders();

    boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values);
    boolean setupAction(User user, List<FormInput> inputs);
    boolean deleteAction(User user, List<FormInput> inputs);


}
