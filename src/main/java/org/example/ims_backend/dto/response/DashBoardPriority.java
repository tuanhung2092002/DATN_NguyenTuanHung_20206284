package org.example.ims_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.entity.Statistic;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DashBoardPriority {
    Long year;
    List<Statistic> statistics;
}
