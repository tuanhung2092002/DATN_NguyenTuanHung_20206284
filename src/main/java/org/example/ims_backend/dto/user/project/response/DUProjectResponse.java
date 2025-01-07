package org.example.ims_backend.dto.user.project.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.user.response.DepartmentGeneral;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DUProjectResponse {
    List<DepartmentGeneral> departments;
}
