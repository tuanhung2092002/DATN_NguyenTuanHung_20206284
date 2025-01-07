package org.example.ims_backend.dto.admin.taskDTO.response;

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
    String task_title;
    Date created_date;
    Date expired_date;
    int status;
    Long assign_department_id;
    Long target_department_id;
    String assign_department_name;
    String target_department_name;
    Long assign_user_id;
    Long targer_user_id;
    Integer progress;
    String assign_user_name;
    String target_user_name;
}
