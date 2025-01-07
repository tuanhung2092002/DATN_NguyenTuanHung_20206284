package org.example.ims_backend.dto.user.task.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.rmi.dgc.Lease;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TaskLeaveProcessingTimeResponse {
    TaskLeave taskImportant;
    List<TaskLeave> TaskLeaves = new ArrayList<>();
}
