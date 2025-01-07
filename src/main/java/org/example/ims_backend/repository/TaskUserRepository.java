package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskUserRepository extends JpaRepository<TaskUser, Long>, JpaSpecificationExecutor<TaskUser> {
    TaskUser findByUserAndTask(User user, Task task);
    TaskUser findByUserAndTaskAndDepartment(User user, Task task, Department department);
    List<TaskUser> findByTaskAndRole(Task task, Integer role);
    boolean existsByTaskAndUserAndDepartment(Task task, User user, Department department);
    void deleteAllByTask(Task task);
    List<TaskUser> findByTask(Task task);
    @Query("SELECT DISTINCT tu.department " +
            "FROM TaskUser tu " +
            "WHERE tu.task.id = :taskId")
    List<Department> findDistinctDepartmentByTaskId(@Param("taskId") Long taskId);
    @Query("SELECT DISTINCT tu.user " +
            "FROM TaskUser tu " +
            "WHERE tu.task.id = :taskId")
    List<User> findDistinctUserByTaskId(@Param("taskId") Long taskId);
    @Query("SELECT COUNT(DISTINCT tu.task.id) " +
            "FROM TaskUser tu " +
            "WHERE tu.department.id = :departmentId"+
            " AND tu.task.project.id = :projectId")
    Integer countDistinctTasksByDepartmentIdAndProjectId(@Param("departmentId") Long departmentId, @Param("projectId") Long projectId);
}
