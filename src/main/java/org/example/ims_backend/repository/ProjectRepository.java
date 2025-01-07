package org.example.ims_backend.repository;

import org.example.ims_backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProjectRepository extends JpaRepository<Project, Long> , JpaSpecificationExecutor<Project> {
}
