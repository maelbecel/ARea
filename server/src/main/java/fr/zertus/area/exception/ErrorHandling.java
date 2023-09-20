package fr.zertus.area.exception;

import fr.zertus.area.payload.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * This class is used to handle exceptions thrown by the application when a request is made
 * Return a ResponseEntity with the error message
 * This is for uniformity and to avoid having to handle exceptions in each controller
 */
@ControllerAdvice
public class ErrorHandling extends ResponseEntityExceptionHandler {

    /**
     * Handle IllegalArgumentException -> Bad Request (400)
     * @param e The exception
     * @return A ResponseEntity with the error message
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalArgumentException(IllegalArgumentException e) {
        return ApiResponse.badRequest(e.getMessage()).toResponseEntity();
    }

    /**
     * Handle IllegalAccessException -> Unauthorized (401)
     * @param e The exception
     * @return A ResponseEntity with the error message
     */
    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalAccessException(IllegalAccessException e) {
        return ApiResponse.unauthorized(e.getMessage()).toResponseEntity();
    }

    /**
     * Handle DataNotFoundException -> Not Found (404)
     * @param e The exception
     * @return A ResponseEntity with the error message
     */
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleDataNotFoundException(DataNotFoundException e) {
        return ApiResponse.notFound(e.getMessage()).toResponseEntity();
    }

    /**
     * Handle Exception -> Internal Server Error (500) | Also used as a fallback
     * @param e The exception
     * @return A ResponseEntity with the error message
     */
    @ExceptionHandler
    public ResponseEntity<ApiResponse<String>> handleException(Exception e) {
        return ApiResponse.internalServerError(e.getMessage()).toResponseEntity();
    }

}
