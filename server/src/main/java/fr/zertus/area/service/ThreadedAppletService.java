package fr.zertus.area.service;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.app.Reaction;
import fr.zertus.area.entity.Applet;
import fr.zertus.area.exception.ActionTriggerException;
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

    private final Map<Applet, Long> threadedApplets;
    private boolean running;

    public ThreadedAppletService() {
        this.threadedApplets = new HashMap<>();
    }

    public void startThread() {
        this.running = true;

        new Thread(() -> {
            while (running) {
                for (Map.Entry<Applet, Long> entry : threadedApplets.entrySet()) {
                    Applet applet = entry.getKey();
                    Long lastCheck = entry.getValue();
                    long checkTime = Long.parseLong(FormInputUtils.getValue("trigger", applet.getActionData()));

                    if ((System.currentTimeMillis() - lastCheck) / 1000 >= checkTime) { // Check if the time between each check is passed (in seconds)
                        entry.setValue(System.currentTimeMillis());
                        try {
                            Action action = actionReactionService.getAction(applet.getActionSlug());
                            Reaction reaction = actionReactionService.getReaction(applet.getReactionSlug());
                            if (action == null) {
                                log.error("Action not found: " + applet.getActionSlug());
                                continue;
                            }
                            if (reaction == null) {
                                log.error("Reaction not found: " + applet.getReactionSlug());
                                continue;
                            }
                            if (!(action instanceof ManualTrigger manualTrigger)) {
                                log.error("Action is not a manual trigger: " + applet.getActionSlug());
                                continue;
                            }
                            try {
                                List<FormInput> inputs = new ArrayList<>(applet.getActionData());
                                List<Map<String, String>> list = manualTrigger.manualTrigger(applet.getUser(), inputs);
                                applet.setActionData(inputs);
                                for (Map<String, String> map : list) {
                                    reaction.trigger(applet.getUser(), applet.getReactionData(), map);
                                    applet.setLastTriggerDate(new Timestamp(System.currentTimeMillis()));
                                }
                            } catch (ActionTriggerException e) {
                                applet.addLog("Error while triggering action - " + e.getMessage());
                                log.error("Error while triggering action " + applet.getActionSlug() + " for applet " + applet.getId() + " - " + e.getMessage());
                            }
                            appletRepository.save(applet);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
                try {
                    Thread.sleep(10000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }).start();
    }

    public void addApplet(Applet applet) {
        this.threadedApplets.put(applet, (long) 0);
    }

    public void removeApplet(Applet applet) {
        this.threadedApplets.remove(applet);
    }

}
