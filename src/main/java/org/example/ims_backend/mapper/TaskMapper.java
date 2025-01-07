package org.example.ims_backend.mapper;

import org.example.ims_backend.common.ProcessingTime;
import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.response.TaskDetailResponse;
import org.example.ims_backend.dto.user.task.response.TaskLeave;
import org.example.ims_backend.dto.user.task.response.TaskSearchResponse;
import org.example.ims_backend.dto.user.task.response.UpdateTaskResponse;
import org.example.ims_backend.dto.user.taskUser.response.TaskUserResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    default
    TaskDetailResponse toTaskDetailResponse(TaskUser taskUser){
        return TaskDetailResponse.builder()
                .task_id(taskUser.getTask().getId())
                .task_user_id(taskUser.getId())
                .status(taskUser.getTask().getStatus())
                .state(taskUser.getTask().getState())
                .can_edit(taskUser.getTask().getStatus() != 3)
                .role(taskUser.getRole())
                .title(taskUser.getTask().getTitle())
                .assign_department_id(taskUser.getTask().getAssignDepartment().getId())
                .assign_department_name(taskUser.getTask().getAssignDepartment().getDepartmentName())
                .assign_user_id(taskUser.getTask().getAssignUser().getId())
                .assign_user_name(taskUser.getTask().getAssignUser().getFullName())
                .target_department_id(taskUser.getTask().getTargetDepartment().getId())
                .target_department_name(taskUser.getTask().getTargetDepartment().getDepartmentName())
                .target_user_id(taskUser.getTask().getTargetUser().getId())
                .target_user_name(taskUser.getTask().getTargetUser().getFullName())
                .content(taskUser.getTask().getContent())
                .progress(taskUser.getTask().getProgress())
                .priority(taskUser.getTask().getPriority())
                .expired_date(taskUser.getTask().getExpiredDate())
                .completed_date(taskUser.getTask().getCompletedDate())
                .deleted_date(taskUser.getTask().getDeletedDate())
                .created_date(taskUser.getTask().getCreatedDate())
                .can_finished(taskUser.getTask().getStatus() == 3)
                .project_id(taskUser.getTask().getProject().getId())
                .project_name(taskUser.getTask().getProject().getName())
                .build();
    }
    default
    TaskSearchResponse toTaskSearchResponse(TaskUser taskUser){
        return TaskSearchResponse.builder()
                .task_id(taskUser.getTask().getId())
                .tu_id(taskUser.getId())
                .has_read(taskUser.getHasRead())
                .role(taskUser.getRole())
                .status(taskUser.getTask().getStatus())
                .state(taskUser.getTask().getState())
                .title(taskUser.getTask().getTitle())
                .priority(taskUser.getTask().getPriority())
                .progress(taskUser.getTask().getProgress())
                .created_date(taskUser.getTask().getCreatedDate())
                .expired_date(taskUser.getTask().getExpiredDate())
                .completed_date(taskUser.getTask().getCompletedDate())
                .assign_department_id(taskUser.getTask().getAssignDepartment().getId())
                .assign_department_name(taskUser.getTask().getAssignDepartment().getDepartmentName())
                .assign_user_id(taskUser.getTask().getAssignUser().getId())
                .assign_user_name(taskUser.getTask().getAssignUser().getFullName())
                .target_department_id(taskUser.getTask().getTargetDepartment().getId())
                .target_department_name(taskUser.getTask().getTargetDepartment().getDepartmentName())
                .target_user_id(taskUser.getTask().getTargetUser().getId())
                .target_user_name(taskUser.getTask().getTargetUser().getFullName())
                .build();
    }
    default
    TaskDetailResponse toTaskDetailResponseOfAdmin(Task  task, TaskUser taskUser){
        return TaskDetailResponse.builder()

                .task_id(task.getId())
                .task_user_id(taskUser.getId() != null ? taskUser.getId() : null)
                .status(task.getStatus())
                .state(task.getState())
                .can_edit(task.getStatus() != 3)
                .role(taskUser.getRole() != null ? taskUser.getRole() : null)
                .title(task.getTitle())
                .assign_department_id(task.getAssignDepartment().getId())
                .assign_department_name(task.getAssignDepartment().getDepartmentName())
                .assign_user_id(task.getAssignUser().getId())
                .assign_user_name(task.getAssignUser().getFullName())
                .target_department_id(task.getTargetDepartment().getId())
                .target_department_name(task.getTargetDepartment().getDepartmentName())
                .target_user_id(task.getTargetUser().getId())
                .target_user_name(task.getTargetUser().getFullName())
                .content(task.getContent())
                .progress(task.getProgress())
                .priority(task.getPriority())
                .expired_date(task.getExpiredDate())
                .completed_date(task.getCompletedDate())
                .deleted_date(task.getDeletedDate())
                .created_date(task.getCreatedDate())
                .can_finished(task.getStatus() == 3)
                .project_id(task.getProject().getId())
                .project_name(task.getProject().getName())
                .build();
    }
    default
    TaskLeave toTaskLeave(Task task){
        return TaskLeave.builder()
                .task_id(task.getId())
                .status(task.getStatus())
                .state(task.getState())
                .title(task.getTitle())
                .priority(task.getPriority())
                .progress(task.getProgress())
                .created_date(task.getCreatedDate())
                .expired_date(task.getExpiredDate())
                .completed_date(task.getCompletedDate())
                .assign_department(task.getAssignDepartment().getDepartmentName())
                .assign_user_name(task.getAssignUser().getFullName())
                .assign_user_id(task.getAssignUser().getId())
                .target_department(task.getTargetDepartment().getDepartmentName())
                .target_user_name(task.getTargetUser().getFullName())
                .target_user_id(task.getTargetUser().getId())
                .build();
    }
}
