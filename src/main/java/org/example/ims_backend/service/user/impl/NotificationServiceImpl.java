package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.notification.response.NotificationResponse;
import org.example.ims_backend.entity.Notification;
import org.example.ims_backend.entity.NotificationUser;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.mapper.NotificationMapper;
import org.example.ims_backend.repository.NotificationReqository;
import org.example.ims_backend.repository.NotificationUserRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.user.NotificationService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class NotificationServiceImpl implements NotificationService {
    NotificationReqository notificationReqository;
    NotificationUserRepository notificationUserRepository;
    UserRepository userRepository;
    NotificationMapper notificationMapper;
    @Override
    @Transactional
    public void deleteNotification(Task task) {
        try {
            List<Notification> notifications = notificationReqository.findAllByTask(task);
            for(Notification notification : notifications){
                notificationUserRepository.deleteAllByNotification(notification);
            }
            notificationReqository.deleteAllByTask(task);
        } catch (Exception e){
            log.error("Error in deleteNotification", e);
        }
    }

    @Override
    public void addNotification(Task task, User CreateUser, User toUser, String content, Integer type) {
        try {
            Notification notification = notificationReqository.save(
                    Notification.builder()
                            .content(content)
                            .task(task)
                            .createdUser(CreateUser)
                            .type(type)
                            .build()
            );
            notificationUserRepository.save(
                    NotificationUser.builder()
                            .notification(notification)
                            .hasRead(0)
                            .receiverUser(toUser)
                            .build()
            );

        }catch (Exception e){
            log.error("Error in addNotification", e);
        }
    }

    @Override
    public List<NotificationResponse> getNotificationList() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        List<NotificationUser> notificationUsers = notificationUserRepository.findAllByReceiverUser(user);
        return notificationUsers.stream().map(notificationMapper::toNotificationResponse).toList();
    }

}
