package org.example.ims_backend.dto.user.taskUser.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateTaskUserResponse {
    Long combination_department;
    Long combination_user;
}
