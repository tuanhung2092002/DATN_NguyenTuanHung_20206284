package org.example.ims_backend.dto.user.task.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.user.comment.response.CommentResponse;
import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.dto.user.history.response.HistoryResponse;
import org.example.ims_backend.dto.user.report.response.ReportResponse;
import org.example.ims_backend.dto.user.taskUser.response.TaskUserResponse;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskDetailResponse {
    Long task_id;
    Long task_user_id;
    Integer status;
    Integer state;
    boolean can_edit;
    Integer role;
    String title;
    Long assign_department_id;
    String assign_department_name;
    Long assign_user_id;
    String assign_user_name;
    Long target_department_id;
    String target_department_name;
    Long target_user_id;
    String target_user_name;
    String content;
    Integer priority;
    Integer progress;
    Date expired_date;
    Date created_date;
    Date deleted_date;
    Date completed_date;
    boolean can_finished;
    Long project_id;
    String project_name;
    List<ReportResponse> reports= new ArrayList<>();
    List<HistoryResponse> history = new ArrayList<>();
    List<TaskUserResponse> combinations = new ArrayList<>();
    List<CommentResponse> comments = new ArrayList<>();
    List<FileResponse> files = new ArrayList<>();
}
