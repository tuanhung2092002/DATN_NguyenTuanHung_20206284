package org.example.ims_backend.dto.admin.departmentDTO.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentUserRequest {
    Long user_id;
    Long position_id;
    boolean IsMain;
}
