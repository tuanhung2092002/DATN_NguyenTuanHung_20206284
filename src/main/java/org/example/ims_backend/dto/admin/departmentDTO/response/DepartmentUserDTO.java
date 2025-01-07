package org.example.ims_backend.dto.admin.departmentDTO.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class DepartmentUserDTO {
    Long user_id;
    String user_name;
    Long position_id;
    String position_name;
    boolean IsActive;
    boolean IsMain;
}
