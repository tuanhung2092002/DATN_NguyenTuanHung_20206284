package org.example.ims_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.Active;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "position")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PositionId")
    Long id;
    @Column(name = "PositionName")
    String positionName;
    @Column(name = "IsActive")
    int isActive;
    @CreationTimestamp
    @Column(name = "CreatedDate")
    Date createdDate;
    @Column(name = "DeletedDate")
    Date deletedDate;
}
