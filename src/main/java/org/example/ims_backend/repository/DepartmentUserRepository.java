package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentUserRepository extends JpaRepository<DepartmentUser, Long>,JpaSpecificationExecutor<DepartmentUser>{
    List<DepartmentUser> findByUser(User user);
    List<DepartmentUser> findByDepartment(Department department);

    boolean existsByUserAndDepartment(User user, Department department);
}
