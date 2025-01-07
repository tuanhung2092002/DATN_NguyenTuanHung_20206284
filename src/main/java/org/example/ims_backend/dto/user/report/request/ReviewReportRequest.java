package org.example.ims_backend.dto.user.report.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewReportRequest {
    Long user_review_id;
    Long report_id;
    boolean  IsApprove;
}
