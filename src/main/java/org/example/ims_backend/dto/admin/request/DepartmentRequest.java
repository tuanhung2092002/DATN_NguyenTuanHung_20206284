package org.example.ims_backend.dto.admin.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentRequest {
    Long department_id;
    Long position_id;
    boolean IsMain;

}
