package fr.zertus.area.app;

import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.utils.FormInput;

import java.util.List;
import java.util.Map;

public interface IReaction {

    String getName();
    String getSlug();
    String getDescription();
    List<FormInput> getInputs();
    Map<String, String> getPlaceholders();

    public boolean setupReaction(ConnectedService service, List<FormInput> inputs);

    public boolean trigger(ConnectedService service);

}
