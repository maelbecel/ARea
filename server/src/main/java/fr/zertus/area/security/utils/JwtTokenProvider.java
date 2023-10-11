package fr.zertus.area.security.utils;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;

@Slf4j
public class JwtTokenProvider {

    public static Key key = SecurityUtils.getEncryptionKey();

    /**
     * Create a JWT token from an authentication object.
     * This token will be valid for 4 weeks.
     * @param authentication the authentication object to create the token from
     * @return the JWT token
     */
    public static String createToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + Long.parseLong("2419000000")); // 4 weeks

        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(expiryDate)
            .signWith(key)
            .compact();
    }

    /**
     * Create a JWT token from an authentication object.
     * @param authentication the authentication object to create the token from
     * @param time the time in milliseconds the token will be valid
     * @return
     */
    public static String createToken(Authentication authentication, long time) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + time);

        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(expiryDate)
            .signWith(key)
            .compact();
    }

    /**
     * Resolve the token from the request.
     * @param request the request to resolve the token from
     * @return the token or null if there is no token
     */
    public static String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * Validate JWT token. Don't forget to set the key before calling this method.
     * Don't throw an exception if the token is invalid but log it.
     * @param token the token to validate
     * @return true if the token is valid
     */
    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty");
        } catch (SignatureException e) {
            log.error("there is an error with the signature of you token ");
        }
        return false;
    }

    /**
     * Get the subject of the token. Don't forget to set the key before calling this method.
     * @param token the token to get the subject from
     * @return the subject of the token
     */
    public static String getSubject(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

}
