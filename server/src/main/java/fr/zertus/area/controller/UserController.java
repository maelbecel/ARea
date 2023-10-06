package fr.zertus.area.controller;

import fr.zertus.area.entity.User;
import fr.zertus.area.exception.AlreadyUsedException;
import fr.zertus.area.payload.request.user.LoginDTO;
import fr.zertus.area.payload.request.user.RegisterDTO;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.security.utils.JwtTokenProvider;
import fr.zertus.area.service.RegisterUserService;
import fr.zertus.area.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
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

@CrossOrigin(origins = "*")
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


    @Operation(summary = "Login", description = "Login to the API", tags = { "User" },
    requestBody=@io.swagger.v3.oas.annotations.parameters.RequestBody(
        description = "User credentials",
        content = {
            @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = LoginDTO.class),
                examples = {
                    @ExampleObject(
                        name = "Example request",
                        description = "This is an example with user credentials",
                        value = "{\"email\":\"mysuperemail\",\"password\":\"mysuperpassword\"}"
                    )
                }
            )
        }
    ))
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Return user token",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = String.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response",
                            description = "This is an example with a token",
                            value = "{\"status\":200,\"message\":\"OK\",\"data\":\"YourBearerToken\"}"
                        )
                    }
                )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "Unauthorized",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = String.class),
                    examples = {
                    @ExampleObject(
                        name = "Example response",
                        description = "This is an example with bad credentials",
                        value = "{\"status\":401,\"message\":\"Bad credentials\"}"
                    )
                }
                )
            ),
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
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "No content", content = @Content),
    })
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Register", description = "Register to the API", tags = { "User" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Return User freshly created",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = User.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response",
                            description = "This is an example with good register",
                            value = "{\"status\":200,\"message\":\"OK\",\"data\":\"YourTokenBearer\"}"
                        )
                    }
                )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "400",
                description = "Bad request",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = String.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response",
                            description = "This is an example with bad format email",
                            value = "{\"status\":400,\"message\":\"Bad format email\"}"
                        )
                    }
                )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "409",
                description = "Conflict",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = String.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response",
                            description = "This is an example with already used email",
                            value = "{\"status\":409,\"message\":\"Email already used\"}"
                        )
                    }
                )
            ),
    })
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Object>> register(@RequestBody RegisterDTO register) throws Exception {
        ApiResponse<User> response = registerUserService.register(register);
        if (response.getStatus() >= 200 && response.getStatus() < 300) {
            return login(new LoginDTO(register.getEmail(), register.getPassword()));
        }
        throw new Exception("Error while registering");
    }

    @Operation(summary = "User info", description = "Get the user information", tags = { "User" })
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "Return the user information",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = User.class),
                    examples = {
                        @ExampleObject(
                            name = "Example response with user",
                            description = "This is an example with user information",
                            value = "{\"status\":200,\"message\":\"OK\",\"data\":{\"id\":1,\"email\":\"lucas1.dupont@epitech.eu\",\"username\":\"Zertus\",\"connectedServices\":[\"github\"]}}"
                        )
                    }
                )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "401",
                description = "Unauthorized",
                content = @Content(
                    schema = @Schema(implementation = String.class))
            ),
    })
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser() throws IllegalAccessException {
        try {
            User user = userService.getCurrentUser();
            return ApiResponse.ok(user).toResponseEntity();
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            throw new IllegalAccessException("Invalid token");
        }
    }

    @Operation(summary = "Verify", description = "Verify the user account", tags = { "User" },
    parameters = {
        @Parameter(name = "token", description = "Token to verify", required = true, example = "YourToken")
    })
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "204",
            description = "Token is valid",
            content = @Content
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Token is invalid",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = String.class),
                examples = @ExampleObject(
                    name = "Example response",
                    description = "This is an example with invalid token",
                    value = "{\"status\":401,\"message\":\"Token is invalid\"}"
                )
            )
        )
    })
    @GetMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verify(@RequestParam String token) {
        boolean verified = userService.verify(token);
        if (verified)
            return ApiResponse.noContent().toResponseEntity();
        return ApiResponse.unauthorized("Token is invalid").toResponseEntity();
    }

}
