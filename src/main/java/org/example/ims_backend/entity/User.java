package org.example.ims_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId")
    private Long id;
    @Column(name = "UserName")
    private String username;
    @Column(name = "Password")
    private String password;
    @Column(name = "LastName")
    private String lastName;
    @Column(name = "FirstName")
    private String firstName;
    @Column(name = "FullName")
    private String fullName;
    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;
    @Column(unique = true ,name = "Email")
    private String email;
    @Column(name = "PhoneNumber")
    private String phone;
    @Column(name = "Gender")
    private int gender;
    @Column(name = "IsActive")
    private int isActive;
    @Column(name = "Hometown")
    private String homeTown;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;
    @Column(name = "DeletedDate")
    private Date deletedDate;
    @Column( name = "IsAdmin")
    private int isAdmin;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DepartmentUser> departmentUsers;

}
