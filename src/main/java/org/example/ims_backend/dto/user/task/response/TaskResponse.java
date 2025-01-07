package org.example.ims_backend.dto.user.task.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskResponse {
    Long task_id;
    Long tu_id;
    int has_read;
    int role;
    int status;
    int state;
    String title;
    int priority;
    int progress;
    Date created_date;
    Date expired_date;
    Date completed_date;
    Date updated_date;
    String assign_department;
    String assign_user_name;
    Long assign_user_id;
    String target_department;
    String target_user_name;
    Long target_user_id;

}
