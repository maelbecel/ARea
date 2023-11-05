package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.BadFormInputException;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.payload.request.applet.AppletDTO;
import fr.zertus.area.repository.AppletRepository;
import fr.zertus.area.utils.FormInputUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
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

    @Autowired
    private MailNotificationService mailNotificationService;

    public Applet save(AppletDTO applet) throws DataNotFoundException {
        if (applet.getName().length() > 140) {
            throw new IllegalArgumentException("Applet name is too long (max 140 characters)");
        }

        User user = userService.getCurrentUser();

        Action action = actionReactionService.getAction(applet.getActionSlug());
        boolean hasManualTrigger = false;
        if (action == null)
            throw new IllegalArgumentException("Action not found");
        try {
            action.setupAction(user, applet.getActionInputs());
            if (action instanceof ManualTrigger) {
                hasManualTrigger = true;
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to setup action: " + e.getMessage());
        }

        List<Applet.StockReaction> reactions = new ArrayList<>();
        for (AppletDTO.StockReactionDto reactionDto : applet.getReactions()) {
            Reaction reaction = actionReactionService.getReaction(reactionDto.getReactionSlug());
            if (reaction == null)
                throw new IllegalArgumentException("Reaction not found");
            try {
                reaction.setupReaction(user, reactionDto.getReactionInputs());
            } catch (Exception e) {
                action.deleteAction(user, applet.getActionInputs());
                throw new IllegalArgumentException("Failed to setup reaction: " + e.getMessage());
            }
            Applet.StockReaction stockReaction = new Applet.StockReaction();
            stockReaction.setReactionSlug(reactionDto.getReactionSlug());
            stockReaction.setReactionData(reactionDto.getReactionInputs());
            reactions.add(stockReaction);
        }

        Applet appletEntity = new Applet(user, applet.getName(), applet.getActionSlug(), applet.getActionInputs(), hasManualTrigger,
            reactions, applet.getNotifUser());

        // Trigger applets
        StringBuilder reactionsList = new StringBuilder("[");
        for (Applet.StockReaction reaction : reactions)
            reactionsList.append(actionReactionService.getReaction(reaction.getReactionSlug()).getName()).append(", ");
        reactionsList = new StringBuilder(reactionsList.substring(0, reactionsList.length() - 2) + "]");
        triggerAction("area51.applet-is-created", Map.of(
            "userId", String.valueOf(user.getId())
        ), Map.of(
            "applet_name", applet.getName(),
            "applet_action", action.getName(),
            "applet_reactions", reactionsList.toString()
        ));

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
            if (action instanceof ManualTrigger) {
                applet.setActionManualTrigger(true);
            }
            applet.setActionSlug(dto.getActionSlug());
            applet.setActionData(dto.getActionInputs());
        }
        if (dto.getReactions() != null && !dto.getReactions().isEmpty()) {
            List<Applet.StockReaction> reactions = new ArrayList<>();
            for (AppletDTO.StockReactionDto reactionDto : dto.getReactions()) {
                Reaction reaction = actionReactionService.getReaction(reactionDto.getReactionSlug());
                if (reaction == null)
                    throw new IllegalArgumentException("Reaction not found");
                try {
                    reaction.setupReaction(user, reactionDto.getReactionInputs());
                } catch (Exception e) {
                    throw new IllegalArgumentException("Failed to setup reaction: " + e.getMessage());
                }
                Applet.StockReaction stockReaction = new Applet.StockReaction();
                stockReaction.setReactionSlug(reactionDto.getReactionSlug());
                stockReaction.setReactionData(reactionDto.getReactionInputs());
                reactions.add(stockReaction);
            }
            applet.setReactions(reactions);
        }
        if (dto.getNotifUser() != null) {
            applet.setNotifUser(dto.getNotifUser());
        }
        if (dto.getEnabled() != null) {
            applet.setEnabled(dto.getEnabled());
        }

        StringBuilder reactionsList = new StringBuilder("[");
        for (Applet.StockReaction reaction : applet.getReactions())
            reactionsList.append(actionReactionService.getReaction(reaction.getReactionSlug()).getName()).append(", ");
        reactionsList = new StringBuilder(reactionsList.substring(0, reactionsList.length() - 2) + "]");
        triggerAction("area51.applet-is-updated", Map.of(
            "userId", String.valueOf(user.getId())
        ), Map.of(
            "applet_name", applet.getName(),
            "applet_action", actionReactionService.getAction(applet.getActionSlug()).getName(),
            "applet_reactions", reactionsList.toString()
        ));

        return appletRepository.save(applet);
    }

    public void delete(long id) throws DataNotFoundException {
        Applet applet = getById(id);
        if (applet.getUser().getId() != userService.getCurrentUser().getId())
            throw new DataNotFoundException("Applet not found");

        if (!applet.getActionSlug().equalsIgnoreCase("area51.applet-is-deleted")) {
            triggerAction("area51.applet-is-deleted", Map.of(
                "userId", String.valueOf(applet.getUser().getId())
            ), Map.of(
                "applet_name", applet.getName()
            ));
        }

        appletRepository.deleteById(id);
    }

    public List<Applet> getForUser(Long userId) {
        return appletRepository.findByUserId(userId);
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
                try {
                    if (action.isTrigger(user, applet.getActionData(), values)) {
                        applet.setLastTriggerDate(new Timestamp(System.currentTimeMillis()));
                        applet.addLog("Applet triggered");
                        for (Applet.StockReaction reaction : applet.getReactions()) {
                            try {
                                Reaction r = actionReactionService.getReaction(reaction.getReactionSlug());
                                if (r == null)
                                    throw new ReactionTriggerException("Reaction not found");
                                r.trigger(user, reaction.getReactionData(), parameters);
                            } catch (Exception e) {
                                log.error("Error while triggering reaction " + reaction.getReactionSlug() + " for applet " + applet.getId() + " - " + e.getMessage());
                            }
                        }
                        if (applet.isNotifUser()) {
                            mailNotificationService.sendAppletTriggerMail(user.getEmail(), user.getUsername(), applet.getName());
                        }
                    }
                } catch (Exception e) {
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
