package fr.zertus.area.entity;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(name = "email")
    String email;

    @Column(name = "username")
    String username;

    @Column(name = "password")
    String password;

    @Column(name = "enabled", columnDefinition = "TEXT")
    String connectedServices;

    public List<ConnectedService> getConnectedServices() {
        if (connectedServices == null || connectedServices.isEmpty())
            return new ArrayList<>();
        Type listType = new TypeToken<List<ConnectedService>>() {}.getType();
        return new Gson().fromJson(this.connectedServices, listType);
    }

    public void setConnectedServices(List<ConnectedService> connectedServices) {
        this.connectedServices = new Gson().toJson(connectedServices);
    }

    public void addConnectedService(ConnectedService connectedService) {
        List<ConnectedService> connectedServices = getConnectedServices();
        for (int i = 0; i < connectedServices.size(); i++) {
            if (connectedServices.get(i).getSlug().equals(connectedService.getSlug())) {
                connectedServices.remove(i);
                break;
            }
        }
        connectedServices.add(connectedService);
        setConnectedServices(connectedServices);
    }

    public ConnectedService getConnectedService(String slug) {
        List<ConnectedService> connectedServices = getConnectedServices();
        for (ConnectedService connectedService : connectedServices) {
            if (connectedService.getSlug().equals(slug))
                return connectedService;
        }
        return null;
    }

    public void removeConnectedService(String slug) {
        List<ConnectedService> connectedServices = getConnectedServices();
        for (int i = 0; i < connectedServices.size(); i++) {
            if (connectedServices.get(i).getSlug().equals(slug)) {
                connectedServices.remove(i);
                break;
            }
        }
        setConnectedServices(connectedServices);
    }

}