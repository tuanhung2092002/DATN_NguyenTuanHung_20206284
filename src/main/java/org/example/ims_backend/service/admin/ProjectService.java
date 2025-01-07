package org.example.ims_backend.service.admin;

import org.example.ims_backend.dto.admin.projectDTO.request.DepartmentOfProject;
import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.dto.user.project.response.DUProjectResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ProjectService {
    Page<ProjectResponse> getProjects(Pageable pageable, String keyword, Date fromCreatedDate, Date toCreatedDate, Date fromExpiredDate, Date toExpiredDate);
    boolean createProject(ProjectRequest projectRequest);
    boolean updateProject(ProjectRequest projectRequest);
    ProjectDetailResponse getProjectDetail(Long id);
    boolean updateDepartmentOfProject(Long id, List<DepartmentOfProject> request);
    TaskResponse getTaskDetail(Long id);
    DUProjectResponse getUsersAndDepartmentsOfProject(Long id);
}
