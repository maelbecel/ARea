package fr.zertus.area.app;

import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.utils.FormInput;

import java.util.List;
import java.util.Map;

public interface IReaction {

    String getName();
    String getSlug();
    String getDescription();
    List<FormInput> getInputs();
    List<FormInput> getInputs(User user);

    boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException;
    boolean deleteReaction(User user, List<FormInput> inputs);

    boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException;
}
