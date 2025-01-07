package org.example.ims_backend.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.common.State;
import org.example.ims_backend.dto.user.task.response.TaskStatisticResponse;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Statistic {
    Long id;
    String name;
    Integer total_task;
    Integer pending_on_time;
    Integer pending_overdue;
    Integer completed_on_time;
    Integer completed_overdue;

}
