package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.notification.response.NotificationResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;

import java.util.List;

public interface NotificationService {
    void deleteNotification(Task task);
    void addNotification(Task task, User CreateUser, User toUser, String content, Integer type);
    List<NotificationResponse> getNotificationList();
}
