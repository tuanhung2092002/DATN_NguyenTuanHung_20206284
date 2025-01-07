package org.example.ims_backend.dto.admin.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Gender;
import org.example.ims_backend.common.Role;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4,message = "USERNAME_INVALID")
    String username;
    @Size(min = 4,message = "PASSWORD_INVALID")
    String password;
    int gender;
    @Size(min = 10,max = 10,message = "PHONE_INVALID")
    @Pattern(regexp = "\\d+", message = "PHONE_MUST_BE_NUMERIC")
    String phone;
    String hometown;
    String firstname;
    String lastname;
    String fullname;
    LocalDate dateofbirth;
    String email;
    boolean IsAdmin;
    List<DepartmentRequest> departments = new ArrayList<>() ;
    boolean IsActive;

}
