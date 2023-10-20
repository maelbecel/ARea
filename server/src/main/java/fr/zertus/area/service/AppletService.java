package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.exception.ReactionTriggerException;
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

    public Applet save(AppletDTO applet) throws DataNotFoundException {
        if (applet.getName().length() > 140) {
            throw new IllegalArgumentException("Applet name is too long (max 140 characters)");
        }

        User user = userService.getCurrentUser();

        Action action = actionReactionService.getAction(applet.getActionSlug());
        if (action == null)
            throw new IllegalArgumentException("Action not found");
        try {
            action.setupAction(user, applet.getActionInputs());
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to setup action: " + e.getMessage());
        }

        Reaction reaction = actionReactionService.getReaction(applet.getReactionSlug());
        if (reaction == null)
            throw new IllegalArgumentException("Reaction not found");
        try {
            reaction.setupReaction(user, applet.getReactionInputs());
        } catch (Exception e) {
            action.deleteAction(user, applet.getActionInputs());
            throw new IllegalArgumentException("Failed to setup reaction: " + e.getMessage());
        }

        Applet appletEntity = new Applet(user, applet.getName(), applet.getActionSlug(), applet.getActionInputs(), "",
            applet.getReactionSlug(), applet.getReactionInputs(), applet.getNotifUser());
        return appletRepository.save(appletEntity);
    }

    public Applet update(long id, AppletDTO dto) throws DataNotFoundException {
        Applet applet = getById(id);
        User user = userService.getCurrentUser();

        if (dto.getName() != null) {
            if (dto.getName().length() > 140) {
                throw new IllegalArgumentException("Applet name is too long (max 140 characters)");
            }
            applet.setName(dto.getName());
        }
        if (dto.getActionSlug() != null && dto.getActionInputs() != null) {
            Action action = actionReactionService.getAction(dto.getActionSlug());
            if (action == null)
                throw new IllegalArgumentException("Action not found");
            try {
                action.setupAction(user, dto.getActionInputs());
            } catch (Exception e) {
                throw new IllegalArgumentException("Failed to setup action: " + e.getMessage());
            }
            applet.setActionSlug(dto.getActionSlug());
            applet.setActionData(dto.getActionInputs());
        }
        if (dto.getReactionSlug() != null && dto.getReactionInputs() != null) {
            Reaction reaction = actionReactionService.getReaction(dto.getReactionSlug());
            if (reaction == null)
                throw new IllegalArgumentException("Reaction not found");
            try {
                reaction.setupReaction(user, dto.getReactionInputs());
            } catch (Exception e) {
                throw new IllegalArgumentException("Failed to setup reaction: " + e.getMessage());
            }
            applet.setReactionSlug(dto.getReactionSlug());
            applet.setReactionData(dto.getReactionInputs());
        }
        if (dto.getNotifUser() != null) {
            applet.setNotifUser(dto.getNotifUser());
        }
        if (dto.getEnabled() != null) {
            applet.setEnabled(dto.getEnabled());
        }
        return appletRepository.save(applet);
    }

    public void delete(long id) throws DataNotFoundException {
        Applet applet = getById(id);
        if (applet.getUser().getId() != userService.getCurrentUser().getId())
            throw new DataNotFoundException("Applet not found");
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
        Applet applet = appletRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Applet not found"));
        if (applet.getUser().getId() != userService.getCurrentUser().getId())
            throw new DataNotFoundException("Applet not found");
        return applet;
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
                } catch (ReactionTriggerException e) {
                    applet.addLog("Error while triggering reaction - " + e.getMessage());
                    log.error("Error while triggering action " + actionSlug + " for applet " + applet.getId() + " - " + e.getMessage());
                } catch (Exception e) {
                    applet.addLog("Error while triggering action - " + e.getMessage());
                    log.error("Error while triggering action " + actionSlug + " for applet " + applet.getId() + " - " + e.getMessage());
                }
            }
            appletRepository.saveAll(applets);
        }).start();
    }

    public void deleteUserApplets(long userId) {
        appletRepository.deleteByUserId(userId);
    }

}
