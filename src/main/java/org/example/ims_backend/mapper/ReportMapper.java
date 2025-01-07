package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.report.response.ReportResponse;
import org.example.ims_backend.entity.Report;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    default ReportResponse toReportResponse(Report report) {

        return ReportResponse.builder()
                .report_id(report.getId())
                .task_id(report.getTask().getId())
                .create_user_id(report.getCreateUser().getId() )
                .create_user_name(report.getCreateUser().getFullName())
                .review_user(report.getReviewUser() != null ? report.getReviewUser().getId() : null)
                .review_user_name(report.getReviewUser() != null ? report.getReviewUser().getFullName() : null)
                .type(report.getType())
                .status(report.getStatus())
                .content(report.getContent())
                .new_expired_date(report.getNewExpiredDate())
                .completed_date(report.getCompletedDate())
                .created_date(report.getCreatedDate())
                .build();
    }
}

