package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.ims_backend.common.Active;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Table(name = "menu")
@Entity
@Getter
@Setter
public class Menu {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "MenuId")
    private Long id;
    @Column(name = "MenuName")
    private String menuName;
    @Column(name = "MenuCode")
    private String menuCode;
    @Column(name = "Query",length = 3000)
    private String query;
    @Column(name = "IsActive")
    private int isActive;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    private Date createdDate;

}
