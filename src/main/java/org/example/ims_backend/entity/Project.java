package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.StatusProject;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "project")
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProjectId")
    private Long id;
    @Column(name = "ProjectName")
    private String name;
    @Column(name = "Content")
    private String content;
    @Column(name = "Status")
    private Integer status;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;
    @Column(name = "DeletedDate")
    private Date deletedDate;
    @Column(name = "ExpiredDate")
    private Date expiredDate;
    @Column(name = "CompletedDate")
    private Date completedDate;

}
