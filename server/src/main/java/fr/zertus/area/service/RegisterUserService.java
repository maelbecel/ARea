package fr.zertus.area.service;

import fr.zertus.area.app.google.GoogleApp;
import fr.zertus.area.app.google.model.GoogleUserInfo;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.AlreadyUsedException;
import fr.zertus.area.payload.request.user.RegisterDTO;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.repository.UserRepository;
import fr.zertus.area.security.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RegisterUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

    /**
     * Register a user in the database
     * @param register the user to register ({@link RegisterDTO})
     * @return the user if it was successfully registered, an error otherwise
     * @throws IllegalArgumentException if the email is invalid or if the email is already in use
     */
    public ApiResponse<User> register(RegisterDTO register) throws AlreadyUsedException {
        if (register.getEmail().isEmpty() || register.getUsername().isEmpty() || register.getPassword().isEmpty())
            throw new IllegalArgumentException("Please fill all the fields!");
        if (!isEmailValid(register.getEmail()))
            throw new IllegalArgumentException("Invalid email address!");

        User user = new User();
        user.setUsername(register.getUsername());
        user.setEmail(register.getEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword()));

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new AlreadyUsedException("Email address already in use!");
        } else if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new AlreadyUsedException("Username already in use!");
        } else {
            return ApiResponse.ok(userRepository.save(user));
        }
    }

    public String registerLoginUserByGoogle(ConnectedService service, String redirectUri) {
        GoogleUserInfo userInfo = GoogleApp.getUserInfo(service);
        if (userInfo == null) {
            return redirectUri + "?error=Fail%20to%20get%20user%20info";
        }
        User user = userRepository.findByEmail(userInfo.getEmail()).orElse(null);
        if (user != null) {
            String userToken = JwtTokenProvider.createToken(user.getEmail());
            return redirectUri + "?token=" + userToken;
        }
        user = new User();
        user.setEmail(userInfo.getEmail());
        user.setUsername(userInfo.getGiven_name());
        user.setPassword(null);
        user.setConnectedServices(new ArrayList<>());

        user.addConnectedService(service);
        service.setSlug("youtube");
        user.addConnectedService(service);
        service.setSlug("gmail");
        user.addConnectedService(service);
        userRepository.save(user);

        String userToken = JwtTokenProvider.createToken(user.getEmail());
        return redirectUri + "?token=" + userToken;
    }

    /**
     * Check if an email is valid with a regex
     * @param email the email to check
     * @return true if the email is valid, false otherwise
     */
    public static boolean isEmailValid(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

}
