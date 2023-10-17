package fr.zertus.area.app.github.model;

import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class GithubRepository {

    long id;
    String full_name;

}
