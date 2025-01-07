package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.report.request.ReportRequest;
import org.example.ims_backend.dto.user.report.request.ReviewReportRequest;
import org.example.ims_backend.dto.user.report.response.ReportResponse;
import org.example.ims_backend.entity.Report;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.mapper.ReportMapper;
import org.example.ims_backend.repository.ReportRepository;
import org.example.ims_backend.repository.TaskRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.user.HistoryService;
import org.example.ims_backend.service.user.NotificationService;
import org.example.ims_backend.service.user.ReportService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ReportServiceImpl implements ReportService {
    ReportRepository reportRepository;
    TaskRepository taskRepository;
    UserRepository userRepository;
    ReportMapper reportMapper;
    HistoryService historyService;
    NotificationService notificationService;
    @Override
    public boolean createReport(ReportRequest reportRequest) {
        try {
            User user = userRepository.findById(reportRequest.getUser_create_id()).orElseThrow(() ->new Exception("User not found"));
            Task task = taskRepository.findById(reportRequest.getTask_id()).orElseThrow(() ->new Exception("Task not found"));
            if(reportRequest.getType() == 3){
                task.setExpiredDate(reportRequest.getNew_expired_date());
                taskRepository.save(task);
            }
            Report report =Report.builder()
                    .newExpiredDate(reportRequest.getNew_expired_date())
                    .content(reportRequest.getContent())
                    .status(0)
                    .type(reportRequest.getType())
                    .task(task)
                    .createUser(user)
                    .build();
            if(reportRequest.getType() == 2){
                report.setCompletedDate(new Date());
            }
            reportRepository.save(report);

            if (reportRequest.getType() == 1){
                task.setState(2);
                taskRepository.save(task);
                notificationService.addNotification(task,user,task.getAssignUser(),"Báo cáo tiến độ ",2);
            } else if(reportRequest.getType() == 2){
                task.setState(3);
                taskRepository.save(task);
                notificationService.addNotification(task,user,task.getAssignUser(),"Báo cáo hoàn thành nhiệm vụ",4);
            }else if(reportRequest.getType() == 3){
                task.setStatus(2);
                taskRepository.save(task);
                notificationService.addNotification(task,user,task.getAssignUser(),"Xin gia hạn",3);
            }
            else{
                task.setStatus(1);
                taskRepository.save(task);
                notificationService.addNotification(task,user,task.getTargetUser(),"Yêu cầu báo cáo tiến độ",2);
            }
            return true;
        }catch (Exception e){
            log.error("Error in createReport", e);
            return false;
        }
    }

    @Override
    public boolean reviewReport(ReviewReportRequest reviewReportRequest) {
        try{
            Report report = reportRepository.findById(reviewReportRequest.getReport_id()).orElseThrow(() -> new Exception("Report not found"));
            report.setReviewUser(userRepository.findById(reviewReportRequest.getUser_review_id()).orElseThrow(() -> new Exception("User not found")));
            if(reviewReportRequest.isIsApprove()){
                report.setStatus(1);
            }
            else{
                report.setStatus(2);
            }
            reportRepository.save(report);
            if(report.getType() == 2 && report.getStatus() == 1){
                Task task = report.getTask();
                task.setStatus(3);
                taskRepository.save(task);
                historyService.addHistory(task.getAssignUser(),task.getTargetUser(),task,"Hoàn thành nhiệm vụ",3);
                notificationService.addNotification(task,task.getAssignUser(),task.getTargetUser(),"Nhiệm vụ đã hoàn thành",5);
            }
            return true;
        }catch (Exception e){
            log.error("Error in reviewReport", e);
            return false;
        }
    }

    @Override
    public boolean recallReport(Long id) {
        try {
            Report report = reportRepository.findById(id).orElseThrow(() -> new Exception("Report not found"));
                reportRepository.delete(report);
                return true;
        }catch (Exception e){
            log.error("Error in recallReport", e);
            return false;
        }
    }

    @Override
    public List<ReportResponse> getReportList(Task task) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        List<ReportResponse> reportResponses =reportRepository.findAllByTask(task).stream().map(reportMapper::toReportResponse).toList();
        for (ReportResponse reportResponse: reportResponses){
            reportResponse.setCan_evict(reportResponse.getStatus() == 0 && reportResponse.getCreate_user_id() == user.getId());
        }
        return reportResponses ;
    }

    @Override
    public void deleteReport(Task task) {
        try {
            reportRepository.deleteAllByTask(task);
        }catch (Exception e){
            log.error("Error in deleteReport", e);
        }
    }

}
