package fr.zertus.area.app.weather;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.App;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.app.weather.action.WeatherWhenTempChangeAction;
import fr.zertus.area.utils.IPGetter;

import java.util.List;

public class WeatherApp extends App {

    @Override
    public String getName() {
        return "Weather";
    }

    @Override
    public List<Action> getActions() {
        return List.of(
            new WeatherWhenTempChangeAction(this.getName())
        );
    }

    @Override
    public List<Reaction> getReactions() {
        return null;
    }

    @Override
    public AppDecoration getDecoration() {
        return new AppDecoration(IPGetter.getServerBaseAddress() + "/service/weather/image", "#00aed1");
    }

}
