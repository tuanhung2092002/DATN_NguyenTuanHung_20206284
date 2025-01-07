package org.example.ims_backend.dto.admin.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE )
public class UpdateUserResponse {
     Long user_id;
     String username;
     String firstName;
     String lastName;
     String fullName;
     String email;
     LocalDate dateOfBirth;
     int gender;
     String phone;
     String hometown;
     boolean IsAdmin;
     boolean IsActive;
     List<DepartmentResponse> department;

}
