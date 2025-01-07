package org.example.ims_backend.dto.user.history.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HistoryResponse {
    Long history_id;
    Long task_id;
    Long department_id;
    Long create_user_id;
    Integer role;
    String content;
    String label_name;
    Date created_date;
}
