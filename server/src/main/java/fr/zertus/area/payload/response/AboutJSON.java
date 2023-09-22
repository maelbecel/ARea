package fr.zertus.area.payload.response;

import fr.zertus.area.app.App;
import fr.zertus.area.utils.IPGetter;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AboutJSON {

    Client client;
    Server server;

    public AboutJSON(List<App.AboutJSONApp> services) {
        this.client = new Client();
        this.client.setHost(IPGetter.getClientIpAddressIfServletRequestExist());

        this.server = new Server();
        this.server.setCurrent_time(new Timestamp(System.currentTimeMillis()));
        this.server.setServices(services);
    }

    @Data
    public static class Client {
        String host;
    }

    @Data
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE)
    public static class Server {
        Timestamp current_time;
        List<App.AboutJSONApp> services;
    }

}
