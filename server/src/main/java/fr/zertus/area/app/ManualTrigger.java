package fr.zertus.area.app;

import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.utils.FormInput;

import java.util.List;
import java.util.Map;

public interface ManualTrigger {

    List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException;

}
