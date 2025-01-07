package org.example.ims_backend.dto.admin.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
     Long user_id;
     @Size(min = 4,message = "USERNAME_INVALID")
     String username;
     String firstname;
     String lastname;
     String fullname;
     int gender;
     String email;
     @Size(min = 10,max = 10,message = "PHONE_INVALID")
     @Pattern(regexp = "\\d+", message = "PHONE_MUST_BE_NUMERIC")
     String phone;
     String hometown;
     LocalDate dateofbirth;
     boolean IsActive;
     boolean IsAdmin;
     List<DepartmentRequest> departments;

}