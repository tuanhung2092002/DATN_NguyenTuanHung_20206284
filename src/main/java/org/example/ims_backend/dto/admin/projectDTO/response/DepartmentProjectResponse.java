package org.example.ims_backend.dto.admin.projectDTO.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentProjectResponse {
    Long department_id;
    String department_name;
    Integer number_task;
    Date created_date;
}
