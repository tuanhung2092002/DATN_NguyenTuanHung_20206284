package org.example.ims_backend.dto.user.task.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskStatisticResponse {
    Long task_id;
    String title;
    Integer status;
    Integer priority;
    Date created_date;
    Date expired_date;
    String assign_user_name;
    Long assign_user_id;
    String target_user_name;
    Long target_user_id;
    Long project_id;
    String project_name;
}
