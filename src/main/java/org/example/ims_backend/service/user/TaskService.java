package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.request.ProcessingTimeRequest;
import org.example.ims_backend.dto.user.task.response.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface TaskService {
    List<TaskResponse> getListMuneById(Long menu_id);
    List<TaskSearchResponse> searchTask(String title, Long department_id, Long user_id, LocalDateTime createTo, LocalDateTime createFrom, LocalDateTime expireTo, LocalDateTime expireFrom, Integer task_status, Integer priority);
    TaskDetailResponse TaskDetail(Long task_id);
    boolean evictTask(Long task_user_id);
    TaskDetailResponse createTask(CreateTaskRequest createTaskRequest);
    boolean processingHandover(HandoverTaskRequest handoverTaskRequest);
    boolean updateProcessing(Long task_user_id,Integer processing);
    boolean deleteTask(Long task);
    boolean returnTask(Long task_id , String content);
    TaskOfDay taskOfTheDay();
    boolean leaveProcessingTime(List<ProcessingTimeRequest> processingTimeRequests , Long id);
    List<TaskLeaveProcessingTimeResponse> leaveProcessingTimeDetail();
    boolean updateTask(UpdateTaskResponse updateTaskResponse);
}
