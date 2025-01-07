package org.example.ims_backend.dto.user.task.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskLeave {
    Long task_id;
    int status;
    int state;
    String title;
    int priority;
    int progress;
    Date created_date;
    Date expired_date;
    Date new_expired_date;
    Date completed_date;
    String assign_department;
    String assign_user_name;
    Long assign_user_id;
    String target_department;
    String target_user_name;
    Long target_user_id;
}
