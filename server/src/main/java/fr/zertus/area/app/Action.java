package fr.zertus.area.app;

import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class Action implements IAction {

    private final String name;
    private final String slug;
    private final String description;

    protected final List<FormInput> inputs;
    protected final Map<String, String> placeholders;

    public Action(String appName, String name, String description) {
        this.name = name;
        this.slug = StringUtils.slugify(appName) + "." + StringUtils.slugify(name);
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
        return slug;
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
    public List<FormInput> getInputs(User user) {
        return inputs;
    }

    @Override
    public Map<String, String> getPlaceholders() {
        return placeholders;
    }

    @Override
    public boolean setupAction(User user, List<FormInput> inputs) {
        return false;
    }

    @Override
    public boolean deleteAction(User user, List<FormInput> inputs) {
        return false;
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        return false;
    }
}
