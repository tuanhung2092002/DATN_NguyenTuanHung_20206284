package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.taskUser.response.TaskUserResponse;
import org.example.ims_backend.entity.TaskUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TaskUserMapper {
    default TaskUserResponse toTaskUserResponse(TaskUser taskUser){
        return TaskUserResponse.builder()
                .combination_id(taskUser.getUser().getId())
                .task_id(taskUser.getTask().getId())
                .combination_department_id(taskUser.getTask().getAssignDepartment().getId())
                .combination_department_name(taskUser.getTask().getAssignDepartment().getDepartmentName())
                .created_date(taskUser.getTask().getCreatedDate())
                .combination_name(taskUser.getUser().getFullName())
                .build();
    }
}
