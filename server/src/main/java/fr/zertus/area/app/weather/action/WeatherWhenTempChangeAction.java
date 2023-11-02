package fr.zertus.area.app.weather.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.ActionTriggerUtils;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.Data;

import java.util.List;
import java.util.Map;

public class WeatherWhenTempChangeAction extends Action implements ManualTrigger {

    public WeatherWhenTempChangeAction(String appName) {
        super(appName, "When temperature change", "When the temperature drops below or rises above a certain value");

        this.inputs.add(FormInput.createSelectInput("get_time", "Time before each check", List.of(
            "1 hour",
            "2 hours",
            "3 hours",
            "6 hours",
            "12 hours",
            "24 hours"
        )));
        this.inputs.add(FormInput.createTextInput("city", "City"));
        this.inputs.add(FormInput.createSelectInput("condition", "Condition", List.of(
            "If the temperature drops below",
            "If the temperature rises above"
        )));
        this.inputs.add(FormInput.createTextInput("temp", "Temperature"));

        this.placeholders.put("temp", "Temperature");
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        String tempStr = FormInputUtils.getValue("temp", inputs);

        try {
            double temp = Double.parseDouble(tempStr);
            if (temp < -273.15 || temp > 273.15)
                throw new ActionTriggerException("Temperature is not in range [-273.15, 273.15]");
        } catch (NumberFormatException e) {
            throw new ActionTriggerException("Temperature is not a number");
        }

        String city = FormInputUtils.getValue("city", inputs);
        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4d0ceddc6cb1f657a94490e936e62240";
        try {
            ApiResponse<WeatherResponse> response = BasicApiClient.sendGetRequest(url, WeatherResponse.class);

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ActionTriggerException("City not found");
        } catch (Exception e) {
            throw new ActionTriggerException("City is not valid");
        }

        String time = FormInputUtils.getValue("get_time", inputs);
        inputs.add(FormInput.createHiddenInput("trigger", "Trigger", ActionTriggerUtils.getTimeInSecond(time)));
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        return true;
    }

    @Override
    public List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException {
        String city = FormInputUtils.getValue("city", inputs);
        String condition = FormInputUtils.getValue("condition", inputs);
        String tempStr = FormInputUtils.getValue("temp", inputs);
        double temp = 0;
        try {
            temp = Double.parseDouble(tempStr);
        } catch (NumberFormatException e) {
            throw new ActionTriggerException("Temperature is not a number");
        }

        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4d0ceddc6cb1f657a94490e936e62240";
        try {
            ApiResponse<WeatherResponse> response = BasicApiClient.sendGetRequest(url, WeatherResponse.class);

            double tempInCelsius = response.getData().getMain().getTemp() - 273.15;
            tempInCelsius = Math.round(tempInCelsius * 100.0) / 100.0;
            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ActionTriggerException("Failed to get weather");
            if (condition.equalsIgnoreCase("If the temperature drops below") && tempInCelsius < temp)
                return List.of(Map.of("temp", String.valueOf(tempInCelsius)));
            if (condition.equalsIgnoreCase("If the temperature rises above") && tempInCelsius > temp)
                return List.of(Map.of("temp", String.valueOf(tempInCelsius)));
            return List.of();
        } catch (Exception e) {
            throw new ActionTriggerException("Failed to get weather");
        }
    }

    @Data
    private static class WeatherResponse {
        private String name;
        private Main main;

        @Data
        private static class Main {
            private double temp;
        }
    }

}
