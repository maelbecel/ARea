package fr.zertus.area.app;

import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class Reaction implements IReaction {

    private final String name;
    private final String slug;
    private final String description;

    protected final List<FormInput> inputs;

    public Reaction(String app, String name, String description) {
        this.name = name;
        this.description = description;
        this.slug = StringUtils.slugify(app + "." + name);

        this.inputs = new ArrayList<>();
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
    public boolean setupReaction(User user, List<FormInput> inputs) throws BadFormInputException {
        for (FormInput input : inputs) {
            if (!input.isValid())
                return false;
        }
        return false;
    }

    @Override
    public boolean deleteReaction(User user, List<FormInput> inputs) {
        return false;
    }

    /**
     * Trigger the reaction
     * @param user the user that triggered the reaction
     * @param inputs the inputs of the reaction
     * @param parameters the placeholders values <placeholder, value>
     * @return true if the reaction was triggered, false otherwise
     * @throws ReactionTriggerException
     */
    @Override
    public boolean trigger(User user, List<FormInput> inputs, Map<String, String> parameters) throws ReactionTriggerException {
        return false;
    }

}
