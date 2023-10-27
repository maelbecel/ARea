package fr.zertus.area;

import fr.zertus.area.service.ThreadedAppletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class InitApp implements ApplicationRunner {

    @Autowired
    private ThreadedAppletService threadedAppletService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("---------------------------- Starting threaded applet service ----------------------------");
        threadedAppletService.startThread();
    }
}
