package org.example.ims_backend.dto.user.report.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportResponse {
    Long report_id;
    Long task_id;
    Long create_user_id;
    String create_user_name;
    int type;
    int status;
    String content;
    Date new_expired_date;
    Date created_date;
    Date completed_date;
    Long review_user;
    String review_user_name;
    boolean can_evict;

}
