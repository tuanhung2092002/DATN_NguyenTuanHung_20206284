package org.example.ims_backend.dto.user.notification.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    Long notification_id;
    Long task_id;
    String task_title;
    Long create_user_id;
    String create_user_name;
    Integer has_read;
    String content;
    Integer type;
    Date created_date;
}
