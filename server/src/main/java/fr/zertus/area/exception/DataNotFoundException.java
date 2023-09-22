package fr.zertus.area.exception;

/**
 * Custom exception to throw when data is not found
 * Used in the service layer
 */
public class DataNotFoundException extends Exception {

    public DataNotFoundException(String message) {
        super(message);
    }

}
