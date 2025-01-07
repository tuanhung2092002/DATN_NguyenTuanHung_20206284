package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.task.response.TaskStatisticResponse;
import org.example.ims_backend.entity.Task;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatisticMapper {
    default TaskStatisticResponse toTaskStatisticResponse(Task task){
        return TaskStatisticResponse.builder()
                .task_id(task.getId())
                .title(task.getTitle())
                .priority(task.getPriority())
                .status(task.getStatus())
                .created_date(task.getCreatedDate())
                .expired_date(task.getExpiredDate())
                .project_id(task.getProject().getId())
                .project_name(task.getProject().getName())
                .assign_user_id(task.getAssignUser().getId())
                .assign_user_name(task.getAssignUser().getFullName())
                .target_user_id(task.getTargetUser().getId())
                .target_user_name(task.getTargetUser().getFullName())
                .build();
    }
}
