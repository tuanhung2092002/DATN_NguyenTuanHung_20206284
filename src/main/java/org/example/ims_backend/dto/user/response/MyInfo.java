package org.example.ims_backend.dto.user.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MyInfo {
    Long user_id;
    String user_name;
    String email;
    String phone;
    LocalDate dateOfBirth;
    String fullName;
    String firstName;
    String lastName;
    Integer gender;
    boolean IsAdmin;
    boolean IsActive;
    List<MyDepartment> departments = new ArrayList<>();
    String homeTown;

}
