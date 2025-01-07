package org.example.ims_backend.dto.admin.departmentDTO.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.Active;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class DepartmentDTO {
    private Long departmentId;
    private String departmentName;
    private String departmentCode;
    private boolean IsActive;
    private Long department_parent_id;
    private String department_parent_name;
    private List<DepartmentDTO> child_departments = new ArrayList<>();

    // Constructor
    public DepartmentDTO(Long departmentId, String departmentName, boolean IsActive,Long department_parent_id,String department_parent_name,String departmentCode) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.IsActive = IsActive;
        this.department_parent_id = department_parent_id;
        this.department_parent_name =department_parent_name;
        this.departmentCode = departmentCode;
    }


    // Method to add sub-department to the parent department
    public void addSubDepartment(DepartmentDTO child_department) {
        if (this.child_departments == null) {
            this.child_departments = new ArrayList<>();
        }
        // Avoid adding duplicates
        if (!this.child_departments.contains(child_department)) {
            this.child_departments.add(child_department);
        }
    }
}

