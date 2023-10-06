package fr.zertus.area.service;

import fr.zertus.area.entity.User;
import fr.zertus.area.repository.UserRepository;
import fr.zertus.area.security.AreaUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AreaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Load a user from the database using its email
     * @param username the email of the user
     * @return the user if it exists
     * @throws UsernameNotFoundException if the user doesn't exist
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByEmail(username).orElse(null);
            if (user == null) {
                user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
            }
            return new AreaUserDetails(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
