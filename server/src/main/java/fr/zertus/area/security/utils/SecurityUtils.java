package fr.zertus.area.security.utils;

import fr.zertus.area.exception.DataNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

public class SecurityUtils {

    @Value("${area.encryption.key}")
    private static String key;

    /**
     * Get the current user id from the current user in SecurityContextHolder
     * @return the current user id
     * @throws DataNotFoundException if the current user is not set
     */
    public static long getCurrentUserId() throws DataNotFoundException {
        if (SecurityContextHolder.getContext().getAuthentication() == null)
            throw new DataNotFoundException("Current user not set");
        return (long) SecurityContextHolder.getContext().getAuthentication().getCredentials();
    }

    /**
     * Get the encryption key from the application.properties file
     * @return the encryption key
     */
    public static Key getEncryptionKey() {
        key = "8Ed3wkfXGtThKV731jqvs82n7i4NSIuMJTzB/AHPPGsEt5TmI96Y/nyAWlCcka/PgWBO6exEqJaHSAnNqY/C1hPe+0BHQZOQ6jF6UYG+T4qhLWF5FHBW5EXR7fEyOUgThuac+IjS9ooAwapYJRFOsdYXdbAZ+WfAr94xE5KspSw0Ftzx/4aOw9qEsFQAGOvsnVL7CEFiQstwAv05vplKpZtH2WqbOxCuCBEPLQ==";
        return new SecretKeySpec(key.getBytes(), "HmacSHA512");
    }

    public static String getTempToken(long userId) {
        String text = "mysupertokenidisverylongandverysecure";
        byte[] encodedBytes = Base64.getEncoder().encode(text.getBytes());
        String base64Text = new String(encodedBytes);
        return base64Text + "-" + userId;
    }

    public static long getUserIdFromTempToken(String token) {
        return Long.parseLong(token.split("-")[1]);
    }

}
