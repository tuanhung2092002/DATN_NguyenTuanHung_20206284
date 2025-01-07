package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TaskId")
    private Long id;
    @Column(name = "Status")
    private Integer status;
    @Column(name = "State")
    private Integer state;
    @Column(name = "Priority")
    private Integer priority;
    @Column(name = "Title")
    private String title;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AssignDepartment")
    private Department assignDepartment;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AssignUser")
    private User assignUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TargetDepartment")
    private Department targetDepartment;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TargetUser")
    private User targetUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ProjectId")
    private Project project;
    @Column(name = "Content")
    private String content;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;
    @Column(name = "DeletedDate")
    private Date deletedDate;
    @Column(name = "ExpiredDate")
    private Date expiredDate;
    @Column(name = "CompletedDate")
    private Date completedDate;
    @Column(name = "Progress")
    private Integer progress;
    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TaskUser> taskUsers;

}
