package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "report")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ReportId")
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TaskId")
    private Task task;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CreateUser")
    private User createUser;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ReviewUser")
    private User reviewUser;
    @Column(name = "Content")
    private String content;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;
    @Column(name = "NewExpiredDate")
    private Date newExpiredDate;
    @Column(name = "CompletedDate")
    private Date CompletedDate;
    @Column(name = "Status")
    private int status;
    @Column(name = "Type")
    private int type;

}
