package fr.zertus.area.security.utils;

import fr.zertus.area.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

public class SecurityUtils {

    @Value("${area.encryption.key}")
    private static String key;

    public static long getCurrentUserId() throws DataNotFoundException {
        if (SecurityContextHolder.getContext().getAuthentication() == null)
            throw new DataNotFoundException("Current user not set");
        return (long) SecurityContextHolder.getContext().getAuthentication().getCredentials();
    }

    public static Key getEncryptionKey() {
        return new SecretKeySpec(key.getBytes(), "HmacSHA512");
    }

}
