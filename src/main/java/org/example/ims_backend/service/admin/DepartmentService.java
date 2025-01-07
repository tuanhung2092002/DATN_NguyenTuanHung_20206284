package org.example.ims_backend.service.admin;

import org.example.ims_backend.dto.admin.departmentDTO.request.DepartmentRequest;
import org.example.ims_backend.dto.admin.departmentDTO.request.DepartmentUserRequest;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentDTO;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentUserDTO;

import java.util.List;

public interface DepartmentService {
    List<DepartmentDTO> getDepartment();
    boolean createDepartment(DepartmentRequest request);
    boolean updateDepartment(Long id,DepartmentRequest request);
    List<DepartmentUserDTO> getUsersOfDepartment(Long id);
    boolean updateUsersOfDepartment(Long id, List<DepartmentUserRequest> users);
}
