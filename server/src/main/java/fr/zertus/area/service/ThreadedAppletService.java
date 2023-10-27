package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.exception.ReactionTriggerException;
import fr.zertus.area.repository.AppletRepository;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ThreadedAppletService {

    @Autowired
    private AppletRepository appletRepository;

    @Autowired
    private ActionReactionService actionReactionService;

    private final Map<Long, Long> threadedApplets;
    private boolean running;

    public ThreadedAppletService() {
        this.threadedApplets = new HashMap<>();
    }

    public void startThread() {
        this.running = true;

        new Thread(() -> {
            while (running) {
                List<Applet> applets = appletRepository.findByActionManualTrigger(true);

                for (Applet applet : applets) {
                    Long lastCheck = this.threadedApplets.get(applet.getId());
                    if (lastCheck == null) {
                        lastCheck = 0L;
                    }
                    long checkTime = Long.parseLong(FormInputUtils.getValue("trigger", applet.getActionData()));

                    if ((System.currentTimeMillis() - lastCheck) / 1000 >= checkTime) { // Check if the time between each check is passed (in seconds)
                        this.threadedApplets.put(applet.getId(), System.currentTimeMillis()); // Update the last check time
                        Action action = actionReactionService.getAction(applet.getActionSlug());
                        if (action == null) {
                            log.error("Action not found: " + applet.getActionSlug());
                            continue;
                        }
                        if (!(action instanceof ManualTrigger manualTrigger)) {
                            log.error("Action is not a manual trigger: " + applet.getActionSlug());
                            continue;
                        }
                        try {
                            List<FormInput> actionInputs = applet.getActionData();
                            List<Map<String, String>> values = manualTrigger.manualTrigger(applet.getUser(), actionInputs);
                            applet.setActionData(actionInputs);
                            if (values == null) {
                                log.error("Action returned null: " + applet.getActionSlug());
                                continue;
                            }
                            for (Map<String, String> value : values) {
                                for (Applet.StockReaction reaction : applet.getReactions()) {
                                    Reaction r = actionReactionService.getReaction(reaction.getReactionSlug());
                                    if (r == null) {
                                        log.error("Reaction not found: " + reaction.getReactionSlug());
                                        continue;
                                    }
                                    r.trigger(applet.getUser(), reaction.getReactionData(), value);
                                }
                            }
                        } catch (ActionTriggerException e) {
                            log.error("Failed to trigger action: " + e.getMessage());
                            if (!(applet.getLogs().size() > 1 && applet.getLogs().get(applet.getLogs().size() - 1).equals("Failed to trigger action: " + e.getMessage())))
                                applet.addLog("Failed to trigger action: " + e.getMessage());
                        } catch (ReactionTriggerException e) {
                            log.error("Failed to trigger reaction: " + e.getMessage());
                            if (!(applet.getLogs().size() > 1 && applet.getLogs().get(applet.getLogs().size() - 1).equals("Failed to trigger reaction: " + e.getMessage())))
                                applet.addLog("Failed to trigger reaction: " + e.getMessage());
                        } catch (Exception e) {
                            log.error("This should not happen: " + e.getMessage());
                        }
                        appletRepository.save(applet);
                    }
                }
                try {
                    Thread.sleep(25000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();
    }

}
