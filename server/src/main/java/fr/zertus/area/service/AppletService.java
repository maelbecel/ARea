package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.request.applet.AppletDTO;
import fr.zertus.area.repository.AppletRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AppletService {

    @Autowired
    private AppletRepository appletRepository;

    @Autowired
    private ActionReactionService actionReactionService;

    @Autowired
    private UserService userService;

    public Applet save(AppletDTO applet) throws DataNotFoundException, BadFormInputException {
        User user = userService.getCurrentUser();

        Action action = actionReactionService.getAction(applet.getActionSlug());
        if (action == null)
            throw new IllegalArgumentException("Action not found");
        try {
            if (!action.setupAction(user, applet.getActionInputs()))
                throw new IllegalArgumentException("Failed to setup action");
        } catch (Exception e) {
            throw new IllegalArgumentException("Action: " + e.getMessage());
        }

        Reaction reaction = actionReactionService.getReaction(applet.getReactionSlug());
        if (reaction == null)
            throw new IllegalArgumentException("Reaction not found");
        try {
            if (!reaction.setupReaction(user, applet.getReactionInputs())) {
                action.deleteAction(user, applet.getActionInputs());
                throw new IllegalArgumentException("Failed to setup reaction");
            }
        } catch (Exception e) {
            action.deleteAction(user, applet.getActionInputs());
            throw new IllegalArgumentException("Reaction: " + e.getMessage());
        }

        Applet appletEntity = new Applet(user, applet.getName(), applet.getActionSlug(), applet.getActionInputs(), "",
            applet.getReactionSlug(), applet.getReactionInputs(), applet.isNotifUser());
        return appletRepository.save(appletEntity);
    }

    public void delete(long id) {
        appletRepository.deleteById(id);
    }

    public List<Applet> getForUser(Long userId) {
        return appletRepository.findByUserId(userId);
    }

    public List<Applet> getForAction(String action_slug) {
        return appletRepository.findByActionSlug(action_slug);
    }

    public List<Applet> getForReaction(String reaction_slug) {
        return appletRepository.findByReactionSlug(reaction_slug);
    }

    public Applet getById(Long id) throws DataNotFoundException {
        return appletRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Applet not found"));
    }

    /**
     * Trigger all enabled applets for a specific action
     * This method is called if the action is triggered and is in charge of triggering all reactions is action is really triggered
     * Also update the last trigger date for each applet and add some logs for interested users
     * This method is called in a new thread to avoid blocking the action
     *
     * @param actionSlug The action slug
     * @param values The values for action verification
     * @param parameters The parameters for reaction triggering (to replace placeholders, check triggered action to get placeholders)
     */
    public void triggerAction(String actionSlug, Map<String, String> values, Map<String, String> parameters) {
        new Thread(() -> {
            List<Applet> applets = appletRepository.findByActionSlugAndEnabled(actionSlug, true);
            for (Applet applet : applets) {

                User user = applet.getUser();
                Action action = actionReactionService.getAction(applet.getActionSlug());
                Reaction reaction = actionReactionService.getReaction(applet.getReactionSlug());
                if (reaction == null) {
                    applet.addLog("Reaction not found");
                    log.error("Reaction " + applet.getReactionSlug() + " not found");
                    continue;
                }
                try {
                    if (action.isTrigger(user, applet.getActionData(), values)) {
                        applet.setLastTriggerDate(new Timestamp(System.currentTimeMillis()));
                        applet.addLog("Action triggered");
                        reaction.trigger(user, applet.getReactionData(), parameters);
                        applet.addLog("Reaction triggered");
                        if (applet.isNotifUser()) {
                            // TODO: Add notification to user if needed
                        }
                    }
                } catch (Exception e) { // We don't want to stop the loop if an applet fail to trigger, we just log the error
                    applet.addLog("Error while triggering action - " + e.getMessage());
                    log.error("Error while triggering action " + actionSlug + " for applet " + applet.getId() + " - " + e.getMessage());
                }
                appletRepository.save(applet); // TODO: Find a way to save all applets at the end of the loop with a single request
            }
        }).start();
    }

}
