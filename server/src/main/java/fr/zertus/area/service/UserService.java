package fr.zertus.area.service;

import fr.zertus.area.entity.User;
import fr.zertus.area.exception.DataNotFoundException;
import fr.zertus.area.payload.request.user.RegisterDTO;
import fr.zertus.area.repository.UserRepository;
import fr.zertus.area.security.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean userExists(String id) {
        long userId = Long.parseLong(id);
        return userExists(userId);
    }

    public boolean userExists(long id) {
        User user = userRepository.findById(id).orElse(null);
        return user != null;
    }

    public User getUser(String id) {
        long userId = Long.parseLong(id);
        return getUser(userId);
    }

    public User getUser(long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getCurrentUser() throws DataNotFoundException {
        return getUser(SecurityUtils.getCurrentUserId());
    }

    public boolean updateUser(RegisterDTO user) throws DataNotFoundException {
        User currentUser = getCurrentUser();
        if (currentUser == null)
            return false;
        if (!user.getEmail().isEmpty() && RegisterUserService.isEmailValid(user.getEmail()))
            currentUser.setEmail(user.getEmail());
        if (!user.getPassword().isEmpty())
            currentUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(currentUser);
        return true;
    }

}
