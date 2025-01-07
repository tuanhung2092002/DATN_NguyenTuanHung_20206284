package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Notification;
import org.example.ims_backend.entity.NotificationUser;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationUserRepository extends JpaRepository<NotificationUser,Long>, JpaSpecificationExecutor<NotificationUser> {
    Integer countByReceiverUserAndHasRead(User toUser, int hasRead);
    void deleteAllByNotification(Notification notification);
    List<NotificationUser> findAllByReceiverUser(User toUser);
}
