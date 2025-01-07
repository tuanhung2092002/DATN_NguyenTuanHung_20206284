package org.example.ims_backend.dto.user.report.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportRequest {
    Long task_id;
    Long user_create_id;
    String content;
    int type;
    Date new_expired_date;
}
