package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.DepartmentProject;
import org.example.ims_backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentProjectRepository extends JpaRepository<DepartmentProject, Long>, JpaSpecificationExecutor<DepartmentProject> {
    List<DepartmentProject> findByProject(Project project);
    boolean existsByProjectAndDepartment(Project project, Department department);
    List<DepartmentProject> findDepartmentProjectByDepartment(Department department);
}
