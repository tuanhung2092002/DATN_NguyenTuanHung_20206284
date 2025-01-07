package org.example.ims_backend.dto.admin.projectDTO.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProjectDetailResponse {
    private Long project_id;
    private String project_name;
    private String content;
    private int number_task;
    private int status;
    private Date created_date;
    private Date expired_date;
    private Date completed_date;
    List<TaskResponse> tasks;
    List<DepartmentProjectResponse> departments;
}
