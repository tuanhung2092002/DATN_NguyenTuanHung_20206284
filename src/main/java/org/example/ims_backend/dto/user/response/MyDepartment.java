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
public class MyDepartment {
    Long department_id;
    String department_name;
    Long position_id;
    String position_name;
    List<MyProject> projects = new ArrayList<>();
}
