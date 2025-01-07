package org.example.ims_backend.dto.admin.taskDTO.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskRequest {
    Long task_id;
    String task_title;
    Date created_date;
    Date expired_date;
    int status;
    Long department_id;
    Long assign_user_id;
    Long targer_user_id;
}
