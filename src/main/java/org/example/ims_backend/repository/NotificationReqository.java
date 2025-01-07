package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Notification;
import org.example.ims_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationReqository extends JpaRepository<Notification, Long> , JpaSpecificationExecutor<Notification> {
    List<Notification> findAllByTask(Task task);
    void deleteAllByTask(Task task);
}
