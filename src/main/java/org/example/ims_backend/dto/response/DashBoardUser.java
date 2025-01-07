package org.example.ims_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.entity.Statistic;

import java.util.ArrayList;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DashBoardUser {
    Integer total_task;
    Integer pending_on_time;
    Integer pending_overdue;
    Integer completed_on_time;
    Integer completed_overdue;
    List<Statistic> statistics = new ArrayList<>();
}
