package org.example.ims_backend.dto.admin.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentDTO;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class GeneralResponse {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = lombok.AccessLevel.PRIVATE )
    public static class Position {
        Long positionId;
        String positionName;
    }
    List<Position> position;
    List<DepartmentDTO> departments;
}
