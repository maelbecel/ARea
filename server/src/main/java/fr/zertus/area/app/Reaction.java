package fr.zertus.area.app;

import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class Reaction implements IReaction {

    private final String name;
    private final String description;

    protected final List<FormInput> inputs;

    protected final Map<String, String> placeholders;

    public Reaction(String name, String description) {
        this.name = name;
        this.description = description;

        this.inputs = new ArrayList<>();
        this.placeholders = new HashMap<>();
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getSlug() {
        return StringUtils.slugify(getName());
    }

    @Override
    public String getDescription() {
        return description;
    }

    @Override
    public List<FormInput> getInputs() {
        return inputs;
    }

    @Override
    public Map<String, String> getPlaceholders() {
        return placeholders;
    }

    @Override
    public boolean setupReaction(ConnectedService service, List<FormInput> inputs) {
        return false;
    }

    @Override
    public boolean trigger(ConnectedService service, Map<String, String> placeholders, Map<String, String> parameters) {
        return false;
    }

}
