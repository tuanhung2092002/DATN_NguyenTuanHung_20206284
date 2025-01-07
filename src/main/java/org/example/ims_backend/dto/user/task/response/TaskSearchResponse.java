package org.example.ims_backend.dto.user.task.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskSearchResponse {
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
    Long assign_department_id;
    String assign_department_name;
    String assign_user_name;
    Long assign_user_id;
    Long target_department_id;
    String target_department_name;
    String target_user_name;
    Long target_user_id;
}
