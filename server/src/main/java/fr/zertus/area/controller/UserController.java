package fr.zertus.area.controller;

import fr.zertus.area.entity.User;
import fr.zertus.area.payload.request.user.CheckDTO;
import fr.zertus.area.payload.request.user.LoginDTO;
import fr.zertus.area.payload.request.user.RegisterDTO;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.JwtTokenProvider;
import fr.zertus.area.service.RegisterUserService;
import fr.zertus.area.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Tag(name = "User", description = "User endpoint")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RegisterUserService registerUserService;

    @Autowired
    private UserService userService;


    @Operation(summary = "Login", description = "Login to the API", tags = { "User" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Return a JWT token", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
    })
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

    @Operation(summary = "Logout", description = "Logout from the API", tags = { "User" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "No content"),
    })
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Register", description = "Register to the API", tags = { "User" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Return a JWT token", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Conflict", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
    })
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody RegisterDTO register) {
        ApiResponse<User> response = registerUserService.register(register);
        return response.toResponseEntity();
    }

    @Operation(summary = "User info", description = "Get the user information", tags = { "User" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Return the user information", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = User.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),
    })
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
