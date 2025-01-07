package org.example.ims_backend.dto.user.taskUser.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateTaskUserRequest {
    Long combination_department;
    Long combination_user;
    Date created_date;
}
