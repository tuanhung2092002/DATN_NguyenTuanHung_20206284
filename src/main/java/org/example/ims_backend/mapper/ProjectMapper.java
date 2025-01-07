package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.dto.user.response.MyProject;
import org.example.ims_backend.entity.DepartmentProject;
import org.example.ims_backend.entity.Project;
import org.example.ims_backend.entity.Task;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    default ProjectResponse toProjectResponse(Project project){
        return ProjectResponse.builder()
                .project_id(project.getId())
                .project_name(project.getName())
                .content(project.getContent())
                .status(project.getStatus())
                .created_date(project.getCreatedDate())
                .expired_date(project.getExpiredDate())
                .completed_date(project.getCompletedDate())
                .build();
    }
    default Project toProject(Project project, ProjectRequest projectRequest){
        project.setName(projectRequest.getProject_name());
        project.setContent(projectRequest.getContent());
        project.setStatus(projectRequest.getStatus());
        project.setExpiredDate(projectRequest.getExpired_date());
        return project;
    }
    default ProjectDetailResponse toProjectDetailResponse(Project project , List<Task> tasks){
        List<TaskResponse> taskResponses = tasks.stream().map(task -> TaskResponse.builder()
                .task_id(task.getId())
                .task_title(task.getTitle())
                .created_date(task.getCreatedDate())
                .expired_date(task.getExpiredDate())
                .status(task.getStatus())
                .assign_user_id(task.getAssignUser().getId())
                .targer_user_id(task.getTargetUser().getId())
                .assign_department_id(task.getAssignDepartment().getId())
                .target_department_id(task.getTargetDepartment().getId())
                .assign_department_name(task.getAssignDepartment().getDepartmentName())
                .target_department_name(task.getTargetDepartment().getDepartmentName())
                .progress(task.getProgress())
                .assign_user_name(task.getAssignUser().getFullName())
                .target_user_name(task.getTargetUser().getFullName())
                .build()).toList();
       return ProjectDetailResponse.builder()
                                    .project_id(project.getId())
                                    .project_name(project.getName())
                                    .content(project.getContent())
                                    .status(project.getStatus())
                                    .created_date(project.getCreatedDate())
                                    .expired_date(project.getExpiredDate())
                                    .completed_date(project.getCompletedDate())
                                    .tasks(taskResponses)
                                    .build();
    }
    default List<MyProject> toMyProject(List<DepartmentProject> departmentProjects){
        List<MyProject> myProjects = new ArrayList<>();
        for(DepartmentProject departmentProject : departmentProjects){
            if(departmentProject.getProject().getStatus() != 3){
                myProjects.add(
                        MyProject.builder()
                                .project_id(departmentProject.getProject().getId())
                                .project_name(departmentProject.getProject().getName())
                                .content(departmentProject.getProject().getContent())
                                .status(departmentProject.getProject().getStatus())
                                .expired_date(departmentProject.getProject().getExpiredDate())
                                .build()
                );
            }
        }
        return myProjects;
    }
}
