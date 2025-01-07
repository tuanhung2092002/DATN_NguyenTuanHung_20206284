package org.example.ims_backend.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDepartmentGenal {
    Long user_id;
    String user_name;
    String user_email;
    String full_name;
    Long position_id;
    String position_name;
    boolean IsDepartmentMain;
}
