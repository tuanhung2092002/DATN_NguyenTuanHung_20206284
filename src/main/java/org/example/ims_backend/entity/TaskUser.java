package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.HasRead;
import org.example.ims_backend.common.Role;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Table(name = "task_user")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    private Task task;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UserId")
    private User user;
    @Column(name = "Role")
    private Integer role;
    @Column(name = "HasRead")
    private Integer hasRead;
    @Column(name = "IsPin")
    private Integer isPin;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;
    @Column(name = "UpdatedDate")
    private Date updatedDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="DepartmentId")
    private Department department;

}
