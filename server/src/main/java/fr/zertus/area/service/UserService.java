package fr.zertus.area.service;

import fr.zertus.area.entity.ConnectedService;
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

    /**
     * Check if a user exists in the database, using a string as id
     * @param id the id of the user
     * @return true if the user exists, false otherwise
     */
    public boolean userExists(String id) {
        long userId = Long.parseLong(id);
        return userExists(userId);
    }

    /**
     * Check if a user exists in the database
     * @param id the id of the user
     * @return true if the user exists, false otherwise
     */
    public boolean userExists(long id) {
        User user = userRepository.findById(id).orElse(null);
        return user != null;
    }

    /**
     * Get a user from the database, using a string as id
     * @param id the id of the user
     * @return the user if it exists, null otherwise
     */
    public User getUser(String id) {
        long userId = Long.parseLong(id);
        return getUser(userId);
    }

    /**
     * Get a user from the database
     * @param id the id of the user
     * @return the user if it exists, null otherwise
     */
    public User getUser(long id) {
        return userRepository.findById(id).orElse(null);
    }

    /**
     * Get the current user from SecurityContext
     * @return the current user
     * @throws DataNotFoundException if the SecurityContext is empty (no user logged in or invalid token)
     */
    public User getCurrentUser() throws DataNotFoundException {
        return getUser(SecurityUtils.getCurrentUserId());
    }

    /**
     * Update current user (from SecurityContext) with the given RegisterDTO
     * @param user the current user ({@link RegisterDTO}
     * @return true if the user has been updated, false otherwise
     * @throws DataNotFoundException if the SecurityContext is empty (no user logged in or invalid token)
     */
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

    /**
     * Save a user in the database
     * @param user the user to save
     */
    public void save(User user) {
        userRepository.save(user);
    }

}