package fr.zertus.area.exception;

import fr.zertus.area.payload.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * This class is used to handle exceptions thrown by the application when a request is made
 * Return a ResponseEntity with the error message
 * This is for uniformity and to avoid having to handle exceptions in each controller
 */
@ControllerAdvice
@Slf4j
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

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return new ResponseEntity<>(ApiResponse.badRequest(ex.getMessage()), HttpStatus.BAD_REQUEST);
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
     * Handle HttpRequestMethodNotSupportedException -> Method Not Allowed (405)
     * @param ex The exception
     * @param headers The headers of the request
     * @param status The status of the request
     * @param request The request
     * @return A ResponseEntity with the error message
     */
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return new ResponseEntity<>(ApiResponse.methodNotAllowed(ex.getMessage()), HttpStatus.METHOD_NOT_ALLOWED);
    }

    /**
     * Handle AlreadyUsedException -> Conflict (409)
     * @param e The exception
     * @return A ResponseEntity with the error message
     */
    @ExceptionHandler(AlreadyUsedException.class)
    public ResponseEntity<ApiResponse<String>> handleAlreadyUsedException(AlreadyUsedException e) {
        return ApiResponse.conflict(e.getMessage()).toResponseEntity();
    }

    /**
     * Handle Exception -> Internal Server Error (500) | Also used as a fallback
     * @param e The exception
     * @return A ResponseEntity with the error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleException(Exception e) {
        log.error(e.getMessage() + " - " + e.getStackTrace()[0]);
        return ApiResponse.internalServerError(e.getMessage()).toResponseEntity();
    }

    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        return new ResponseEntity<>(ApiResponse.internalServerError(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
