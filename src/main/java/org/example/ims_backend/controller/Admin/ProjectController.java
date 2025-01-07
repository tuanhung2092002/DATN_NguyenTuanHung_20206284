package org.example.ims_backend.controller.Admin;

import org.example.ims_backend.dto.admin.projectDTO.request.DepartmentOfProject;
import org.example.ims_backend.dto.admin.projectDTO.request.ProjectRequest;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectDetailResponse;
import org.example.ims_backend.dto.admin.projectDTO.response.ProjectResponse;
import org.example.ims_backend.dto.admin.taskDTO.request.TaskRequest;
import org.example.ims_backend.dto.admin.taskDTO.response.TaskResponse;
import org.example.ims_backend.dto.user.project.response.DUProjectResponse;
import org.example.ims_backend.service.admin.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @GetMapping("/projects")
    ResponseEntity<Page<ProjectResponse>> getProjects(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "15", required = false) int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromCreatedDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date toCreatedDate,
            @RequestParam(required = false)@DateTimeFormat(pattern = "yyyy-MM-dd") Date fromExpiredDate,
            @RequestParam(required = false)@DateTimeFormat(pattern = "yyyy-MM-dd") Date toExpiredDate
            ) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "expiredDate"));
        Page<ProjectResponse> projects = projectService.getProjects(pageable,keyword,fromCreatedDate,toCreatedDate,fromExpiredDate,toExpiredDate);
        return ResponseEntity.ok(projects);
    }
    @PostMapping("/createProject")
    boolean createProject(@RequestBody ProjectRequest request) {
        return projectService.createProject(request);
    }
        @PutMapping("/updateProject/{id}")
    boolean updateProject(@RequestBody ProjectRequest request,
                          @PathVariable Long id) {
        request.setProject_id(id);
        return projectService.updateProject(request);
    }
    @GetMapping("/project/{id}")
    ProjectDetailResponse getProjectDetail(@PathVariable Long id) {
        return projectService.getProjectDetail(id);
    }
    @PutMapping("/updateDepartmentOfProject/{id}")
    boolean updateDepartmentOfProject(@RequestBody List<DepartmentOfProject> request,
                                      @PathVariable Long id) {
        return projectService.updateDepartmentOfProject(id,request);
    }

    @GetMapping("/task/{id}")
    public TaskResponse getTaskDetail(@PathVariable Long id) {
        return projectService.getTaskDetail(id);
    }
    @GetMapping("/usersAndDepartmentsOfProject/{id}")
    public DUProjectResponse getUsersAndDepartmentsOfProject(@PathVariable Long id) {
        return projectService.getUsersAndDepartmentsOfProject(id);
    }
}
