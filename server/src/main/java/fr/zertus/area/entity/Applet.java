package fr.zertus.area.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "applets")
public class Applet {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id")
    long id;

    @ManyToOne @JoinColumn(name = "user_id")
    User user;

    @Column(name = "name")
    String name;

    @Column(name = "action_slug")
    String actionSlug;

    @Column(name = "action_data")
    String actionData;

    @Column(name = "action_trigger")
    String actionTrigger;

    @Column(name = "reaction_slug")
    String reactionSlug;

    @Column(name = "reaction_data")
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

}