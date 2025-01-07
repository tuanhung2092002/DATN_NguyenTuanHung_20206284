package org.example.ims_backend.dto.user.taskUser.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskUserResponse {
    Long combination_id;
    Long task_id;
    Long combination_department_id;
    String combination_department_name;
    Date created_date;
    String combination_name;
}
