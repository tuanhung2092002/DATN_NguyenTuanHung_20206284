package org.example.ims_backend.dto.user.task.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.user.taskUser.request.TaskUserRequest;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HandoverTaskRequest {
    Long task_id;
    Long target_user_id;
    Long target_department_id;
    String content;
    List<TaskUserRequest> combinations = new ArrayList<>();
}
