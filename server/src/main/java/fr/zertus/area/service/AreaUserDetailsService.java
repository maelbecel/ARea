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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
            return new AreaUserDetails(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
