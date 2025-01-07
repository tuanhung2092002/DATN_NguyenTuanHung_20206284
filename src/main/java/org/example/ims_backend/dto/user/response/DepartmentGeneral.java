package org.example.ims_backend.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DepartmentGeneral {
    Long department_id;
    String department_name;
    String department_code;
    Long parent_department_id;
    List<UserDepartmentGenal> users = new ArrayList<>();

}
