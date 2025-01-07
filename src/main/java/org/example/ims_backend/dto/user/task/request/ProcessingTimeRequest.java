package org.example.ims_backend.dto.user.task.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProcessingTimeRequest {
    Long task_id;
    Date new_expired_date;
}
