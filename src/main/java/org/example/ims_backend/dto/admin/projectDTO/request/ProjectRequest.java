package org.example.ims_backend.dto.admin.projectDTO.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectRequest {
    Long project_id;
    String project_name;
    String content;
    int status;
    Date expired_date;
}
