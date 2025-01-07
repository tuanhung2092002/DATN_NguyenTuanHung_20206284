package org.example.ims_backend.dto.admin.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class UserResponse {
    Long id;
    String username;
    String fullName;
    Boolean active;
}
