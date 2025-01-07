package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.report.request.ReportRequest;
import org.example.ims_backend.dto.user.report.request.ReviewReportRequest;
import org.example.ims_backend.dto.user.report.response.ReportResponse;
import org.example.ims_backend.entity.Task;

import java.util.List;

public interface ReportService {
    boolean createReport(ReportRequest reportRequest);
    boolean reviewReport(ReviewReportRequest reviewReportRequest);
    boolean recallReport(Long id);
    List<ReportResponse> getReportList(Task task);
    void deleteReport(Task task);
}
