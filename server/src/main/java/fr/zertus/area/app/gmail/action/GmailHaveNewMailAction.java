package fr.zertus.area.app.gmail.action;

import fr.zertus.area.app.Action;
import fr.zertus.area.app.ManualTrigger;
import fr.zertus.area.app.gmail.model.GmailMail;
import fr.zertus.area.app.gmail.model.GmailMessage;
import fr.zertus.area.app.google.GoogleApp;
import fr.zertus.area.app.google.model.GoogleUserInfo;
import fr.zertus.area.entity.ConnectedService;
import fr.zertus.area.entity.User;
import fr.zertus.area.exception.ActionTriggerException;
import fr.zertus.area.payload.response.ApiResponse;
import fr.zertus.area.utils.ActionTriggerUtils;
import fr.zertus.area.utils.BasicApiClient;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.FormInputUtils;
import lombok.Data;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GmailHaveNewMailAction extends Action implements ManualTrigger {

    public GmailHaveNewMailAction(String appName) {
        super(appName, "Have new mail", "When you have a new mail on your gmail account");

        this.inputs.add(FormInput.createSelectInput("get_time", "Time between each check", List.of(
            "3 minutes", "5 minutes", "10 minutes", "30 minutes"
        )));

        this.placeholders.put("sender_mail", "The sender of the mail");
        this.placeholders.put("sender_name", "The name of the sender");
        this.placeholders.put("subject", "The subject of the mail");
        this.placeholders.put("content", "The content of the mail");
    }

    @Override
    public void setupAction(User user, List<FormInput> inputs) throws ActionTriggerException {
        ConnectedService service = user.getConnectedService("google");
        if (service == null)
            throw new ActionTriggerException("Google service is not connected");

        // Get the historyId
        try {
            String url = "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1";
            ApiResponse<MessageListResponse> response = BasicApiClient.sendGetRequest(url, MessageListResponse.class, Map.of(
                "Authorization", "Bearer " + service.getToken()
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ActionTriggerException("Error while getting the historyId: " + response.getData().toString());
            if (response.getData().getMessages().isEmpty()) {
                throw new ActionTriggerException("Error while getting the historyId: You need to have at least one mail in your inbox");
            }
            String messageId = response.getData().getMessages().get(0).getId();

            String getUrl = "https://gmail.googleapis.com/gmail/v1/users/me/messages/" + messageId;
            ApiResponse<GmailMail> response1 = BasicApiClient.sendGetRequest(getUrl, GmailMail.class, Map.of(
                "Authorization", "Bearer " + service.getToken()
            ));
            if (response1.getStatus() < 200 || response1.getStatus() >= 300)
                throw new ActionTriggerException("Error while getting the historyId: " + response1.getData().toString());
            inputs.add(FormInput.createHiddenInput("historyId", "HistoryId", response1.getData().getHistoryId()));
        } catch (Exception e) {
            throw new ActionTriggerException("Error while getting the historyId: " + e.getMessage());
        }

        // Setup trigger
        String time = FormInputUtils.getValue("get_time", inputs);
        inputs.add(FormInput.createHiddenInput("trigger", "Trigger", ActionTriggerUtils.getTimeInSecond(time)));
    }

    @Override
    public boolean isTrigger(User user, List<FormInput> inputs, Map<String, String> values) {
        return true;
    }

    @Override
    public List<Map<String, String>> manualTrigger(User user, List<FormInput> inputs) throws ActionTriggerException {
        String historyId = FormInputUtils.getValue("historyId", inputs);
        String url = "https://gmail.googleapis.com/gmail/v1/users/me/history?startHistoryId=" + historyId
            + "&historyTypes=messageAdded";
        ConnectedService service = user.getConnectedService("google");
        if (service == null)
            throw new ActionTriggerException("Google service is not connected");

        try {
            ApiResponse<HistoryListResponse> response = BasicApiClient.sendGetRequest(url, HistoryListResponse.class, Map.of(
                "Authorization", "Bearer " + service.getToken()
            ));

            if (response.getStatus() < 200 || response.getStatus() >= 300)
                throw new ActionTriggerException("Error while getting the historyId: " + response.getData().toString());
            FormInputUtils.remove("historyId", inputs);
            inputs.add(FormInput.createHiddenInput("historyId", "HistoryId", response.getData().getHistoryId()));

            List<Map<String, String>> returnList = new ArrayList<>();
            if (response.getData().getHistory() == null) {
                return returnList;
            }
            for (HistoryListResponse.History history : response.getData().getHistory()) {
                for (GmailMessage message : history.getMessages()) {
                    GoogleUserInfo info = GoogleApp.getUserInfo(service);
                    Map<String, String> messageInfos = getMessageInfos(service.getToken(), info.getEmail(), message.getId());
                    if (messageInfos != null)
                        returnList.add(messageInfos);
                }
            }
            return returnList;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ActionTriggerException(e.getMessage());
        }

    }

    private Map<String, String> getMessageInfos(String userToken, String usermail, String messageId) throws IOException {
        String url = "https://gmail.googleapis.com/gmail/v1/users/me/messages/" + messageId;
        ApiResponse<GmailMail> response = BasicApiClient.sendGetRequest(url, GmailMail.class, Map.of(
            "Authorization", "Bearer " + userToken
        ));
        if (response.getStatus() < 200 || response.getStatus() >= 300)
            return null;
        GmailMail mail = response.getData();
        if (mail == null)
            return null;
        if (mail.getFromMail().equalsIgnoreCase(usermail)) {
            return null;
        }
        return Map.of(
            "sender_mail", mail.getFromMail(),
            "sender_name", mail.getFromName(),
            "subject", mail.getSubject(),
            "content", mail.getContent()
        );
    }

    @Data
    private static class MessageListResponse {
        private String nextPageToken;
        private List<GmailMessage> messages;
    }

    @Data
    private static class HistoryListResponse {

        private List<History> history;
        private String historyId;

        @Data
        public static class History {
            private String id;
            private List<GmailMessage> messages;
        }
    }

}
