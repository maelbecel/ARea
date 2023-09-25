package fr.zertus.area.security.utils;

import com.google.gson.Gson;
import fr.zertus.area.payload.response.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenficationEntryPoint extends BasicAuthenticationEntryPoint {

    /**
     * Send a 401 error if the user is not authenticated
     * @param request the request
     * @param response the response
     * @param authException the exception
     * @throws IOException if an error occurs
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().println(new Gson().toJson(ApiResponse.unauthorized("You are not authorized to access this resource.")));
    }

    /**
     * Set the realm name
     */
    @Override
    public void afterPropertiesSet() {
        setRealmName("Area51 JWT");
        super.afterPropertiesSet();
    }

}
