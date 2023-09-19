package fr.zertus.area.controller;

import fr.zertus.area.entity.User;
import fr.zertus.area.payload.request.user.CheckDTO;
import fr.zertus.area.payload.request.user.LoginDTO;
import fr.zertus.area.payload.request.user.RegisterDTO;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.JwtTokenProvider;
import fr.zertus.area.service.RegisterUserService;
import fr.zertus.area.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RegisterUserService registerUserService;

    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Object>> login(@RequestBody LoginDTO login) throws IllegalAccessException {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = JwtTokenProvider.createToken(authentication);

            return ResponseEntity.ok(ApiResponse.ok(jwt));
        } catch (AuthenticationException e) {
            throw new IllegalAccessException("Invalid email/password supplied.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody RegisterDTO register) {
        ApiResponse<User> response = registerUserService.register(register);
        return response.toResponseEntity();
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verify(@RequestBody CheckDTO token) throws IllegalAccessException {
        if (JwtTokenProvider.validateToken(token.getToken())) {
            return ApiResponse.noContent().toResponseEntity();
        }
        throw new IllegalAccessException("Invalid token");
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Object>> getCurrentUser() throws IllegalAccessException {
        try {
            User user = userService.getCurrentUser();
            return ResponseEntity.ok(ApiResponse.ok(user));
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            throw new IllegalAccessException("Invalid token");
        }
    }

}
