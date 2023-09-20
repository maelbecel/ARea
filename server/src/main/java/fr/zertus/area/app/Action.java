package fr.zertus.area.app;

import fr.zertus.area.utils.StringUtils;

public abstract class Action implements IAction {

    private final String name;
    private final String description;

    public Action(String name, String description) {
        this.name = name;
        this.description = description;
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

}
