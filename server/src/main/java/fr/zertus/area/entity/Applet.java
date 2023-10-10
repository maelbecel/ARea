package fr.zertus.area.entity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import fr.zertus.area.utils.FormInput;
import fr.zertus.area.utils.gson.FormInputTypeAdapter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "applets")
@NoArgsConstructor
@AllArgsConstructor
public class Applet {

    private static final Gson gson = new GsonBuilder().registerTypeAdapter(FormInput.class, new FormInputTypeAdapter()).create();

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id")
    long id;

    @ManyToOne @JoinColumn(name = "user_id")
    User user;

    @Column(name = "name")
    String name;

    @Column(name = "action_slug")
    String actionSlug;

    @Column(name = "action_data", columnDefinition = "TEXT")
    String actionData;

    @Column(name = "action_trigger", columnDefinition = "TEXT")
    String actionTrigger;

    @Column(name = "reaction_slug")
    String reactionSlug;

    @Column(name = "reaction_data", columnDefinition = "TEXT")
    String reactionData;

    @Column(name = "last_trigger_date")
    Timestamp lastTriggerDate;

    @Column(name = "created_at")
    Timestamp createdAt;

    @Column(name = "logs")
    String logs;

    @Column(name = "notif_user")
    boolean notifUser;

    @Column(name = "enabled")
    boolean enabled;

    public Applet(User user, String name, String actionSlug, List<FormInput> actionData, String actionTrigger,
                  String reactionSlug, List<FormInput> reactionData, boolean notifUser) {
        this.user = user;
        this.name = name;
        this.actionSlug = actionSlug;
        this.actionData = gson.toJson(actionData);
        this.actionTrigger = actionTrigger;
        this.reactionSlug = reactionSlug;
        this.reactionData = gson.toJson(reactionData);
        this.notifUser = notifUser;
        this.enabled = true;
        this.createdAt = new Timestamp(System.currentTimeMillis());
        this.logs = gson.toJson(List.of());
    }

    public List<String> getLogs() {
        Type type = new TypeToken<List<String>>(){}.getType();
        return gson.fromJson(this.logs, type);
    }

    public void addLog(String log) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Date date = new Date();

        List<String> logs = getLogs();
        logs.add("[" + dateFormat.format(date) + "] " + log);
        this.logs = gson.toJson(logs);
    }

    public List<FormInput> getActionData() {
        Type type = new TypeToken<List<FormInput>>(){}.getType();
        return gson.fromJson(this.actionData, type);
    }

    public List<FormInput> getReactionData() {
        Type type = new TypeToken<List<FormInput>>(){}.getType();
        return gson.fromJson(this.reactionData, type);
    }

    public void setActionData(List<FormInput> actionData) {
        this.actionData = gson.toJson(actionData);
    }

    public void setReactionData(List<FormInput> reactionData) {
        this.reactionData = gson.toJson(reactionData);
    }

}
