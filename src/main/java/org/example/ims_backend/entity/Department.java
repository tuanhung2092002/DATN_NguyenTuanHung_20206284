package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "department")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DepartmentId")
    private Long id;
    @Column(name = "DepartmentName")
    private String departmentName;
    @Column(name = "DepartmentCode")
    private String departmentCode;
    @Column(name = "IsActive")
    private int isActive;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;
    @Column(name = "DeletedDate")
    private Date deletedDate;


}
