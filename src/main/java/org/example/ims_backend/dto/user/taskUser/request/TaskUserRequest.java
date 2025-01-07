package org.example.ims_backend.dto.user.taskUser.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskUserRequest {
    Long combination_id;
    Long department_id;
}
