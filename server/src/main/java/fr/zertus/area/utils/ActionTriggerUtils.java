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
            case "2 hours" -> {return "7200";}
            case "3 hours" -> {return "10800";}
            case "4 hours" -> {return "14400";}
            case "5 hours" -> {return "18000";}
            case "6 hours" -> {return "21600";}
            case "7 hours" -> {return "25200";}
            case "8 hours" -> {return "28800";}
            case "9 hours" -> {return "32400";}
            case "10 hours" -> {return "36000";}
            case "11 hours" -> {return "39600";}
            case "12 hours" -> {return "43200";}
            case "24 hours" -> {return "86400";}
            default -> throw new ActionTriggerException("Invalid time");
        }
    }

}
