package fr.zertus.area.service;

import fr.zertus.area.app.App;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.BasicApiClient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AuthManagerService {

    public static ConnectedService getConnectedService(User user, String serviceName) {
        ConnectedService service = user.getConnectedService(serviceName);
        App app = appService.getApp(serviceName);
        if (service == null)
            return null;

        if (service.getRefreshToken() != null && ((service.getExpiration() + service.getTokenDate()) < System.currentTimeMillis())) {
            ConnectedService newService = app.getOAuth2Handler().refreshToken(service, appService.getTokenRequestsBodyFor(serviceName));

            if (newService == null) {
                log.error("Error while refreshing token for service " + serviceName);
                mailNotificationService.sendAuthErrorMail(user.getEmail(), app.getName());
                return null;
            }
            user.removeConnectedService(serviceName);
            user.addConnectedService(newService);
            userService.save(user);
            return newService;
        }

        return service;
    }

    public static void tokenNotValid(User user, String serviceName) {
        user.removeConnectedService(serviceName);
        mailNotificationService.sendAuthErrorMail(user.getEmail(), serviceName);
        userService.save(user);
    }

    /**
     * AUTOWIRED PART
     */
    private static AppService appService;
    private static UserService userService;
    private static MailNotificationService mailNotificationService;
    @Autowired
    public AuthManagerService(AppService appService, UserService userService, MailNotificationService mailNotificationService) {
        AuthManagerService.appService = appService;
        AuthManagerService.userService = userService;
        AuthManagerService.mailNotificationService = mailNotificationService;
    }


}
