package fr.zertus.area.app.time.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;

import java.util.*;

public class TimeAtHourAction extends Action implements ManualTrigger {

    public TimeAtHourAction(String appName) {
        super(appName, "At hour", "Trigger at a specific hour");

        this.inputs.add(FormInput.createSelectInput("hour", "Hour", List.of(
            "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
            "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
            "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
        )));

        this.placeholders.put("hour", "Hour of trigger");
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        String hour = FormInputUtils.getValue("hour", inputs);
        if (getHour(hour) < 0 || getHour(hour) > 23)
            throw new ActionTriggerException("Invalid hour!");

        // Check all minutes if the action is triggered
        inputs.add(FormInput.createHiddenInput("trigger", "Trigger", "60"));
        inputs.add(FormInput.createHiddenInput("already_trigger_this_hour", "Already trigger this hour", "-1"));
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        return true;
    }

    @Override
    public List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException {
        String neededHour = FormInputUtils.getValue("hour", inputs);
        String alreadyTriggerThisHour = FormInputUtils.getValue("already_trigger_this_hour", inputs);
        int hour = getHour(alreadyTriggerThisHour);

        if (getHour(neededHour) == hour) {
            return List.of();
        }

        Date date = new Date();
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(date);
        int currentHour = calendar.get(Calendar.HOUR_OF_DAY);

        if (currentHour == getHour(neededHour)) {
            FormInputUtils.remove("already_trigger_this_hour", inputs);
            inputs.add(FormInput.createHiddenInput("already_trigger_this_hour", "Already trigger this hour", currentHour + ""));
            return List.of(Map.of("hour", currentHour + ":00"));
        }

        return List.of();
    }

    private int getHour(String hour) {
        return Integer.parseInt(hour.split(":")[0]);
    }
}
