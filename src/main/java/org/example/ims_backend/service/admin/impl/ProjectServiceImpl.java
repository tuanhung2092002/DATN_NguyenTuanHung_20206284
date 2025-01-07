package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.admin.projectDTO.request.DepartmentOfProject;
import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.DepartmentProjectResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.dto.user.project.response.DUProjectResponse;
import org.example.ims_backend.dto.user.response.DepartmentGeneral;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.DepartmentUserMapper;
import org.example.ims_backend.mapper.ProjectMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.repository.specification.ProjectSpecification;
import org.example.ims_backend.service.admin.ProjectService;
import org.example.ims_backend.service.user.FileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    ProjectRepository projectRepository;
    ProjectMapper projectMapper;
    TaskRepository taskRepository;
    TaskUserRepository taskUserRepository;
    DepartmentProjectRepository departmentProjectRepository;
    DepartmentRepository departmentRepository;
    DepartmentUserRepository departmentUserRepository;
    DepartmentUserMapper departmentUserMapper;
    UserRepository userRepository;
    FileService fileService;
    @Override
    public Page<ProjectResponse> getProjects(Pageable pageable, String keyword, Date fromCreatedDate, Date toCreatedDate, Date fromExpiredDate, Date toExpiredDate) {
        Specification<Project> spec = Specification.where(ProjectSpecification
                        .hasKeyword(keyword))
                        .and(ProjectSpecification.createdDateBetween(fromCreatedDate,toCreatedDate))
                        .and(ProjectSpecification.expiredDateBetween(fromExpiredDate,toExpiredDate));

        Page<Project> projects =  projectRepository.findAll(spec,pageable);
        List<ProjectResponse> projectResponseList = projects.stream().map(projectMapper::toProjectResponse).toList();
        for(ProjectResponse projectResponse : projectResponseList){
           int numberTask = taskRepository.countByProject(projectRepository.findById(projectResponse.getProject_id()).orElse(null));
            projectResponse.setNumber_task(numberTask);
        }
        return new PageImpl<>(projectResponseList, pageable, projects.getTotalElements());
    }

    @Override
    public boolean createProject(ProjectRequest projectRequest) {
        try{
            Project project = new Project();
            project.setName(projectRequest.getProject_name());
            project.setContent(projectRequest.getContent());
            project.setStatus(1);
            project.setExpiredDate(projectRequest.getExpired_date());
            project.setCreatedDate(new Date());
            projectRepository.save(project);
            fileService.init(String.valueOf(project.getId()));
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

    @Override
    public boolean updateProject(ProjectRequest projectRequest) {
        try {
            Project project = projectRepository.findById(projectRequest.getProject_id()).orElse(null);
            if (project == null) {
                return false;
            }
            project = projectMapper.toProject(project,projectRequest);
            projectRepository.save(project);
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

    @Override
    public ProjectDetailResponse getProjectDetail(Long id) {
            Project project = projectRepository.findById(id).orElse(null);
            List<Task> tasks = taskRepository.findByProject(project);
        assert project != null;
        ProjectDetailResponse projectDetailResponses= projectMapper.toProjectDetailResponse(project,tasks);
        projectDetailResponses.setNumber_task(tasks.size());
        List<DepartmentProject> departmentProjects = departmentProjectRepository.findByProject(project);
        projectDetailResponses.setDepartments(departmentProjects.stream().map(departmentProject -> DepartmentProjectResponse.builder()
                .department_id(departmentProject.getDepartment().getId())
                .department_name(departmentProject.getDepartment().getDepartmentName())
                .created_date(departmentProject.getCreatedDate())
                .number_task(taskUserRepository.countDistinctTasksByDepartmentIdAndProjectId(departmentProject.getDepartment().getId(),id))
                .build()).toList());
        return projectDetailResponses;


    }

    @Override
    public boolean updateDepartmentOfProject(Long id, List<DepartmentOfProject> request) {
        try {
            Project project = projectRepository.findById(id).orElse(null);
            List<DepartmentProject> departmentProjects = departmentProjectRepository.findByProject(project);
            for (DepartmentOfProject departmentOfProject : request){
                if (!departmentProjectRepository.existsByProjectAndDepartment(project,departmentRepository.findById(departmentOfProject.getDepartment_id()).orElse(null))){
                    DepartmentProject newDepartmentProject = new DepartmentProject();
                    newDepartmentProject.setProject(project);
                    newDepartmentProject.setDepartment(departmentRepository.findById(departmentOfProject.getDepartment_id()).orElse(null));
                    departmentProjectRepository.save(newDepartmentProject);
                }
            }
            for(DepartmentProject departmentProject : departmentProjects){
                boolean isExist = false;
                for(DepartmentOfProject departmentOfProject : request){
                    if(departmentProject.getDepartment().getId().equals(departmentOfProject.getDepartment_id())){

                        departmentProjectRepository.save(departmentProject);
                        isExist = true;
                        break;
                    }
                }
                if(!isExist){
                    departmentProjectRepository.delete(departmentProject);
                }
            }
            return true;
        }catch (Exception e){
            log.error("Error: ", e);
            return false;
        }
    }

    @Override
    public TaskResponse getTaskDetail(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        assert task != null;
        return TaskResponse.builder()
                .task_id(task.getId())
                .task_title(task.getTitle())
                .created_date(task.getCreatedDate())
                .expired_date(task.getExpiredDate())
                .status(task.getStatus())
                .assign_department_id(task.getAssignDepartment().getId())
                .target_department_id(task.getTargetDepartment().getId())
                .assign_department_name(task.getAssignDepartment().getDepartmentName())
                .target_department_name(task.getTargetDepartment().getDepartmentName())
                .assign_user_id(task.getAssignUser().getId())
                .targer_user_id(task.getTargetUser().getId())
                .assign_user_name(task.getAssignUser().getFullName())
                .target_user_name(task.getTargetUser().getFullName())
                .progress(task.getProgress())
                .build();
    }

    @Override
    public DUProjectResponse getUsersAndDepartmentsOfProject(Long id) {
        try{
            Project project = projectRepository.findById(id).orElseThrow(() -> new Exception("Project not found"));
            List<DepartmentProject> departmentProjects = departmentProjectRepository.findByProject(project);
            List<DepartmentGeneral> departmentGenerals =  new ArrayList<>();
            for(DepartmentProject departmentProject : departmentProjects){
                List<DepartmentUser> departmentUsers = departmentUserRepository.findByDepartment(departmentProject.getDepartment());
                departmentGenerals.add(departmentUserMapper.toDepartmentGeneral(departmentUsers));
            }
            return DUProjectResponse.builder()
                    .departments(departmentGenerals)
                    .build();
        }catch (Exception e){
            log.error("Error: ", e);
            return null;
        }
    }

}
