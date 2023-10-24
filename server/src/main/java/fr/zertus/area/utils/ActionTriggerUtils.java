package fr.zertus.area.utils;

import fr.zertus.area.exception.ActionTriggerException;

public class ActionTriggerUtils {

    public static String setupActionTrigger(String timeInSecond, String actionSlug) {
        return timeInSecond + ";" + actionSlug;
    }

    public static String getTimeInSecond(String time) throws ActionTriggerException {
        switch (time) {
            case "1 minute" -> {return "60";}
            case "2 minutes" -> {return "120";}
            case "3 minutes" -> {return "180";}
            case "4 minutes" -> {return "240";}
            case "5 minutes" -> {return "300";}
            case "10 minutes" -> {return "600";}
            case "15 minutes" -> {return "900";}
            case "30 minutes" -> {return "1800";}
            case "1 hour" -> {return "3600";}
            default -> throw new ActionTriggerException("Invalid time");
        }
    }

}
