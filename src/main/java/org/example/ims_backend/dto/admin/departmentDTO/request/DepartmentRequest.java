package org.example.ims_backend.dto.admin.departmentDTO.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentRequest {
    Long parent_department_id;
    String department_name;
    boolean IsActive;
}
