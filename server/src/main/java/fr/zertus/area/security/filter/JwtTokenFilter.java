package fr.zertus.area.security.filter;

import fr.zertus.area.security.AreaUserDetails;
import fr.zertus.area.security.utils.JwtTokenProvider;
import fr.zertus.area.service.AreaUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private AreaUserDetailsService userDetailsService;

    /**
     * Filter that will check if the request has a valid JWT token
     * Set SecurityContext if the token is valid
     * @param request The request
     * @param response The response
     * @param filterChain The filter chain
     * @throws ServletException If the request is not valid
     * @throws IOException If the request is not valid
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String token = JwtTokenProvider.resolveToken(request);

        if (token != null && JwtTokenProvider.validateToken(token)) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(JwtTokenProvider.getSubject(token));
            AreaUserDetails customUserDetails = (AreaUserDetails) userDetails;
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, customUserDetails.getId(), userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}
