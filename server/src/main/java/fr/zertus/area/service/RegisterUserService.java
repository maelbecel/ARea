package fr.zertus.area.service;

import fr.zertus.area.entity.User;
import fr.zertus.area.payload.request.user.RegisterDTO;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RegisterUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

    public ApiResponse<User> register(RegisterDTO register) {
        if (register.getEmail().isEmpty() || register.getUsername().isEmpty() || register.getPassword().isEmpty())
            throw new IllegalArgumentException("Please fill all the fields!");
        if (!isEmailValid(register.getEmail()))
            throw new IllegalArgumentException("Invalid email address!");

        User user = new User();
        user.setUsername(register.getUsername());
        user.setEmail(register.getEmail());
        user.setPassword(passwordEncoder.encode(register.getPassword()));

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email address already in use!");
        } else {
            return ApiResponse.ok(userRepository.save(user));
        }
    }

    public static boolean isEmailValid(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

}
