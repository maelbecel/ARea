package fr.zertus.area.payload.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
/*
  This class is used to normalize responses from the API.
  It is used in the controllers to return a ResponseEntity<ApiResponse<T>>.

  @param <T> The type of the data to return
 */
public class ApiResponse<T> {

    int status;
    String message;
    T data;

    /**
     * Constructor for a response without data
     * @param status The HTTP status code
     * @param message The message to return
     */
    public ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
        this.data = null;
    }

    /**
     * Constructor for a response with data
     * @param status The HTTP status code
     * @param message The message to return
     * @param data The data to return
     */
    public ApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    /**
     * Convert the ApiResponse to a ResponseEntity for the controller
     * @return The ResponseEntity
     */
    public ResponseEntity<ApiResponse<T>> toResponseEntity() {
        return ResponseEntity.status(this.status).body(this);
    }

    /**
     * Create a new ApiResponse with status 200 and the given data
     * @param data The data to return
     * @return The ApiResponse
     * @param <T> The type of the data to return
     */
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(200, "OK", data);
    }

    /**
     * Create a new ApiResponse with status 201 and the given data
     * @param data The data to return
     * @return The ApiResponse
     * @param <T> The type of the data to return
     */
    public static <T> ApiResponse<T> created(T data) {
        return new ApiResponse<>(201, "Created", data);
    }

    /**
     * Create a new ApiResponse with status 201 and no data
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> created() {
        return new ApiResponse<>(201, "Created");
    }

    /**
     * Create a new ApiResponse with status 202 and the given data
     * @param data The data to return
     * @return The ApiResponse
     * @param <T> The type of the data to return
     */
    public static <T> ApiResponse<T> accepted(T data) {
        return new ApiResponse<>(202, "Accepted", data);
    }

    /**
     * Create a new ApiResponse with status 202 and no data
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> accepted() {
        return new ApiResponse<>(202, "Accepted");
    }

    /**
     * Create a new ApiResponse with status 204 and no data
     * Depending on the software used to make the requests, a 204 will not display any content (we still send for fill)
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> noContent() {
        return new ApiResponse<>(204, "No Content");
    }

    /**
     * Create a new ApiResponse with status 400 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> badRequest(String message) {
        return new ApiResponse<>(400, message);
    }

    /**
     * Create a new ApiResponse with status 401 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> unauthorized(String message) {
        return new ApiResponse<>(401, message);
    }

    /**
     * Create a new ApiResponse with status 403 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> forbidden(String message) {
        return new ApiResponse<>(403, message);
    }

    /**
     * Create a new ApiResponse with status 404 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> notFound(String message) {
        return new ApiResponse<>(404, message);
    }

    /**
     * Create a new ApiResponse with status 405 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> methodNotAllowed(String message) {
        return new ApiResponse<>(405, message);
    }

    /**
     * Create a new ApiResponse with status 409 and the given message
     * @param message
     * @return
     */
    public static ApiResponse<String> conflict(String message) {
        return new ApiResponse<>(409, message);
    }

    /**
     * Create a new ApiResponse with status 418 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> imATeapot(String message) {
        return new ApiResponse<>(418, message);
    }

    /**
     * Create a new ApiResponse with status 500 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> internalServerError(String message) {
        return new ApiResponse<>(500, message);
    }

    /**
     * Create a new ApiResponse with status 501 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> notImplemented(String message) {
        return new ApiResponse<>(501, message);
    }

    /**
     * Create a new ApiResponse with status 502 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> badGateway(String message) {
        return new ApiResponse<>(502, message);
    }

    /**
     * Create a new ApiResponse with status 503 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> serviceUnavailable(String message) {
        return new ApiResponse<>(503, message);
    }

    /**
     * Create a new ApiResponse with status 504 and the given message
     * @param message The message to return
     * @return The ApiResponse (type String)
     */
    public static ApiResponse<String> gatewayTimeout(String message) {
        return new ApiResponse<>(504, message);
    }

}
