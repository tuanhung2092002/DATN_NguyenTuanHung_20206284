package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.report.request.ReportRequest;
import org.example.ims_backend.dto.user.report.request.ReviewReportRequest;
import org.example.ims_backend.service.user.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/sendReport")
    public boolean SendReport(@RequestBody ReportRequest reportRequest) {
        return reportService.createReport(reportRequest);
    }
    @PutMapping("/reviewReport")
    public boolean ReviewReport(@RequestBody ReviewReportRequest reviewReportRequest) {
        return reportService.reviewReport(reviewReportRequest);
    }
    @DeleteMapping("/recallReport/{id}")
    public boolean RecallReport(@PathVariable Long id) {
        return reportService.recallReport(id);
    }
}
