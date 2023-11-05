package fr.zertus.area.app.area51.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.utils.FormInput;

import java.util.List;
import java.util.Map;

public class Area51AppletDeletedAction extends Action {

    public Area51AppletDeletedAction(String appName) {
        super(appName, "Applet is deleted", "Applet is deleted by you");

        this.placeholders.put("applet_name", "Applet name");
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {}

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        long userId = user.getId();
        long actualUserId = Long.parseLong(values.get("userId"));
        return userId == actualUserId;
    }

}
