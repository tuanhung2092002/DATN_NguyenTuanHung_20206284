package org.example.ims_backend.dto.user.task.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.user.taskUser.request.CreateTaskUserRequest;
import org.example.ims_backend.dto.user.taskUser.response.UpdateTaskUserResponse;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateTaskResponse {
    Long task_id;
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
    List<UpdateTaskUserResponse> combinations = new ArrayList<>();
}
