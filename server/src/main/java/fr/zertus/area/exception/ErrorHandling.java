package fr.zertus.area.exception;

import fr.zertus.area.payload.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ErrorHandling extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalArgumentException(IllegalArgumentException e) {
        return ApiResponse.badRequest(e.getMessage()).toResponseEntity();
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalAccessException(IllegalAccessException e) {
        return ApiResponse.unauthorized(e.getMessage()).toResponseEntity();
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleDataNotFoundException(DataNotFoundException e) {
        return ApiResponse.notFound(e.getMessage()).toResponseEntity();
    }

    @ExceptionHandler
    public ResponseEntity<ApiResponse<String>> handleException(Exception e) {
        return ApiResponse.internalServerError(e.getMessage()).toResponseEntity();
    }

}
