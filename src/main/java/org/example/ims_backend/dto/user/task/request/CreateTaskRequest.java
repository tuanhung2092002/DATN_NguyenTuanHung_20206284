package org.example.ims_backend.dto.user.task.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.user.taskUser.request.CreateTaskUserRequest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateTaskRequest {
    String title;
    Long assign_department;
    Long assign_user;
    Long target_department;
    Long target_user;
    String content;
    int priority;
    Long project_id;
    Date expired_date;
    Date created_date;
    List<CreateTaskUserRequest> combinations = new ArrayList<>();

}
