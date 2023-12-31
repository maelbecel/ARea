package fr.zertus.area.repository;

import fr.zertus.area.entity.Applet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppletRepository extends CrudRepository<Applet, Long> {

    List<Applet> findByUserId(Long userId);
    List<Applet> findByActionSlugAndEnabled(String action_slug, boolean enabled);

    List<Applet> findByActionManualTrigger(boolean actionManualTrigger);

    void deleteByUserId(Long userId);

}
