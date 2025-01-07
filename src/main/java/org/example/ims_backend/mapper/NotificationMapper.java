package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.notification.response.NotificationResponse;
import org.example.ims_backend.entity.NotificationUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    default NotificationResponse toNotificationResponse(NotificationUser notificationUser){
        return NotificationResponse.builder()
                .notification_id(notificationUser.getNotification().getId())
                .task_id(notificationUser.getNotification().getTask().getId())
                .task_title(notificationUser.getNotification().getTask().getTitle())
                .create_user_id(notificationUser.getNotification().getCreatedUser().getId())
                .create_user_name(notificationUser.getNotification().getCreatedUser().getFullName())
                .has_read(notificationUser.getHasRead())
                .content(notificationUser.getNotification().getContent())
                .type(notificationUser.getNotification().getType())
                .created_date(notificationUser.getNotification().getCreatedDate())
                .build();
    }
}
