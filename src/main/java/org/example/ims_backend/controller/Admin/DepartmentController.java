package org.example.ims_backend.controller.Admin;

import org.example.ims_backend.dto.admin.departmentDTO.request.DepartmentRequest;
import org.example.ims_backend.dto.admin.departmentDTO.request.DepartmentUserRequest;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentDTO;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentUserDTO;
import org.example.ims_backend.service.admin.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
@RestController
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;
    @GetMapping("/department")
    public List<DepartmentDTO> getDepartment() {
        return departmentService.getDepartment();
    }
    @PostMapping("/createDepartment")
    public boolean createDepartment(@RequestBody DepartmentRequest request) {
        return departmentService.createDepartment(request);
    }
    @PutMapping("/updateDepartment/{id}")
    public boolean updateDepartment(@RequestBody DepartmentRequest request, @PathVariable Long id) {
        return departmentService.updateDepartment(id,request);
    }
    @GetMapping("/UsersOfDepartment/{id}")
    public List<DepartmentUserDTO> getUsersOfDepartment(@PathVariable Long id) {
        return departmentService.getUsersOfDepartment(id);
    }
    @PutMapping("/updateUsersOfDepartment/{id}")
    public boolean updateUsersOfDepartment(@PathVariable Long id, @RequestBody List<DepartmentUserRequest> users) {
        return departmentService.updateUsersOfDepartment(id, users);
    }

}
