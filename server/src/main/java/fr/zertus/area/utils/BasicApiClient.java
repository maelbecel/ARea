package fr.zertus.area.utils;

import com.google.gson.Gson;
import fr.zertus.area.payload.response.ApiResponse;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.*;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

public class BasicApiClient {

    private final static HttpClient httpClient = HttpClients.createDefault();

    public static <T> ApiResponse<T> sendGetRequest(String url, Class<T> responseType) throws IOException {
        HttpGet request = new HttpGet(url);
        return executeRequest(request, responseType);
    }

    public static <T> ApiResponse<T> sendGetRequest(String url, Class<T> responseType, Map<String, String> headers) throws IOException {
        HttpGet request = new HttpGet(url);
        addHeadersToRequest(request, headers);
        return executeRequest(request, responseType);
    }

    public static <T> ApiResponse<T> sendPostRequest(String url, Object requestBody, Class<T> responseType) throws IOException {
        HttpPost request = new HttpPost(url);
        setJsonRequestBody(request, requestBody);
        return executeRequest(request, responseType);
    }

    public static <T> ApiResponse<T> sendPostRequest(String url, Object requestBody, Class<T> responseType, Map<String, String> headers) throws IOException {
        HttpPost request = new HttpPost(url);
        addHeadersToRequest(request, headers);
        if (headers.containsKey("Content-Type") && !headers.get("Content-Type").equals("application/json")) {
            StringEntity entity = new StringEntity(requestBody.toString());
            entity.setContentType(headers.get("Content-Type"));
            request.setEntity(entity);
        } else
            setJsonRequestBody(request, requestBody);
        return executeRequest(request, responseType);
    }

    public static <T> ApiResponse<T> sendPatchRequest(String url, Object requestBody, Class<T> responseType) throws IOException {
        HttpPatch request = new HttpPatch(url);
        setJsonRequestBody(request, requestBody);
        return executeRequest(request, responseType);
    }

    public static <T> ApiResponse<T> sendPatchRequest(String url, Object requestBody, Class<T> responseType, Map<String, String> headers) throws IOException {
        HttpPatch request = new HttpPatch(url);
        addHeadersToRequest(request, headers);
        if (headers.containsKey("Content-Type") && !headers.get("Content-Type").equals("application/json")) {
            StringEntity entity = new StringEntity(requestBody.toString());
            entity.setContentType(headers.get("Content-Type"));
            request.setEntity(entity);
        } else
            setJsonRequestBody(request, requestBody);
        return executeRequest(request, responseType);
    }

    private static void setJsonRequestBody(HttpEntityEnclosingRequestBase request, Object requestBody) throws UnsupportedEncodingException {
        String jsonBody = new Gson().toJson(requestBody);
        StringEntity entity = new StringEntity(jsonBody);
        entity.setContentType("application/json");
        request.setEntity(entity);
    }

    private static <T> ApiResponse<T> executeRequest(HttpUriRequest request, Class<T> responseType) throws IOException {
        HttpResponse response = httpClient.execute(request);

        int statusCode = response.getStatusLine().getStatusCode();
        ApiResponse<T> apiResponse = new ApiResponse<>(statusCode, null);
        HttpEntity entity = response.getEntity();
        System.out.print(request.toString() + " " + statusCode);
        if (entity != null) {
            String responseString = EntityUtils.toString(entity);
            System.out.println(" - " + responseString);
            if (responseType == String.class)
                apiResponse.setData((T) responseString);
            else
                apiResponse.setData(new Gson().fromJson(responseString, responseType));
        } else {
            System.out.println(" - No response body");
            apiResponse.setData(null);
        }
        return apiResponse;
    }

    private static void addHeadersToRequest(HttpUriRequest request, Map<String, String> headers) {
        if (headers != null) {
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                request.addHeader(entry.getKey(), entry.getValue());
            }
        }
    }

}
