package org.example.ims_backend.service.user.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.ProcessingTime;
import org.example.ims_backend.dto.user.task.request.CreateTaskRequest;
import org.example.ims_backend.dto.user.task.request.HandoverTaskRequest;
import org.example.ims_backend.dto.user.task.request.ProcessingTimeRequest;
import org.example.ims_backend.dto.user.task.response.*;
import org.example.ims_backend.dto.user.taskUser.request.CreateTaskUserRequest;
import org.example.ims_backend.dto.user.taskUser.request.TaskUserRequest;
import org.example.ims_backend.dto.user.taskUser.response.UpdateTaskUserResponse;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.TaskMapper;
import org.example.ims_backend.mapper.TaskUserMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.repository.specification.TaskSpecification;
import org.example.ims_backend.service.user.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class TaskServiceImpl implements TaskService {
    TaskRepository taskRepository;
    MenuRepository menuRepository;
    EntityManager entityManager;
    TaskUserRepository taskUserRepository;
    UserRepository userRepository;
    DepartmentRepository departmentRepository;
    ProjectRepository projectRepository;
    HistoryService historyService;
    FileService fileService;
    TaskMapper taskMapper;
    TaskUserMapper taskUserMapper;
    CommentService commentService;
    ReportService reportService;
    NotificationService notificationService;
    @Override
    public List<TaskResponse> getListMuneById( Long menu_id) {
        List<TaskResponse> taskResponses = new ArrayList<>();
        Menu menu = menuRepository.findById(menu_id).orElse(null);
        String query = menu.getQuery();
        var context = SecurityContextHolder.getContext();
        User user = userRepository.findByUsername(context.getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));
        Long user_id = user.getId();
        Query qery = entityManager.createQuery(query);
        qery.setParameter("userId", user_id);
        List results = qery.getResultList();
        for(Object result : results){
            Object[] resultArray = (Object[]) result;
            Department assign_department = (Department) resultArray[13];
            User assign_user = (User) resultArray[14];
            Department target_department = (Department) resultArray[15];
            User target_user = (User) resultArray[16];
            TaskResponse taskResponse = TaskResponse.builder()
                    .task_id((Long) resultArray[0])
                    .tu_id((Long) resultArray[1])
                    .role((int) resultArray[2])
                    .status((int) resultArray[4])
                    .state((int) resultArray[5])
                    .title((String) resultArray[6])
                    .priority((int) resultArray[7])
                    .created_date((Date) resultArray[9])
                    .expired_date((Date) resultArray[8])
                    .completed_date((Date) resultArray[12])
                    .assign_department(assign_department.getDepartmentName())
                    .assign_user_name(assign_user.getFullName())
                    .assign_user_id(assign_user.getId())
                    .target_department(target_department.getDepartmentName())
                    .target_user_name(target_user.getFullName())
                    .target_user_id(target_user.getId())
                    .progress(taskRepository.findById((Long) resultArray[0]).orElseThrow(() -> new RuntimeException("Task not found")).getProgress())
                    .has_read(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getHasRead())
                    .updated_date(taskUserRepository.findByUserAndTask(userRepository.findById(user_id).orElse(null),taskRepository.findById((Long) resultArray[0]).orElse(null)).getUpdatedDate())
                    .build();
            taskResponses.add(taskResponse);
        }
        return taskResponses;
    }

    @Override
    public List<TaskSearchResponse> searchTask(String title, Long department_id, Long user_id, LocalDateTime createTo, LocalDateTime createFrom, LocalDateTime expireTo, LocalDateTime expireFrom, Integer task_status, Integer priority) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Specification<Task> spec = Specification.where(TaskSpecification
                        .hasParticipant(user)
                        .and(TaskSpecification.getTaskByTitle(title))
                        .and(TaskSpecification.getTaskByDepartment(department_id))
                        .and(TaskSpecification.hasUser(user_id))
                        .and(TaskSpecification.createdDateBetween(createFrom, createTo))
                        .and(TaskSpecification.expiredDateBetween(expireFrom, expireTo))
                        .and(TaskSpecification.getTaskByStatus(task_status))
                        .and(TaskSpecification.getTaskByPriority(priority)));
        List<Task> tasks = taskRepository.findAll(spec);
        List<TaskSearchResponse> taskSearchResponses = new ArrayList<>();
        for(Task task : tasks){
            TaskUser taskUser = taskUserRepository.findByUserAndTask(user, task);
            TaskSearchResponse taskSearchResponse = taskMapper.toTaskSearchResponse(taskUser);
            taskSearchResponses.add(taskSearchResponse);
        }
        return taskSearchResponses;
    }

    @Override
    public TaskDetailResponse TaskDetail(Long task_id) {
        try {
            var context = SecurityContextHolder.getContext();
            String username = context.getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
            Task task = taskRepository.findById(task_id).orElseThrow(() -> new RuntimeException("Task not found"));
            if(user.getIsAdmin() == 1){
                List<TaskUser> taskUsers = taskUserRepository.findByTaskAndRole(task, 0);
                TaskUser taskUser = taskUsers.isEmpty() ? new TaskUser(): taskUsers.get(0);
                TaskDetailResponse taskDetail = taskMapper.toTaskDetailResponseOfAdmin(task, taskUser);
                taskDetail.setCombinations(taskUserRepository.findByTaskAndRole(task, 2).stream().map(taskUserMapper::toTaskUserResponse).toList());
                taskDetail.setFiles(fileService.getFiles(task));
                taskDetail.setReports(reportService.getReportList(task));
                taskDetail.setComments(commentService.getComments(task));
                taskDetail.setHistory(historyService.getHistoryList(task));
                return taskDetail;
            }else {
                TaskUser taskUser = taskUserRepository.findByUserAndTask(userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found")), taskRepository.findById(task_id).orElseThrow(() -> new RuntimeException("Task not found")));
                TaskDetailResponse taskDetail = taskMapper.toTaskDetailResponse(taskUser);
                taskDetail.setCombinations(taskUserRepository.findByTaskAndRole(task, 2).stream().map(taskUserMapper::toTaskUserResponse).toList());
                taskDetail.setFiles(fileService.getFiles(task));
                taskDetail.setReports(reportService.getReportList(task));
                taskDetail.setComments(commentService.getComments(task));
                taskDetail.setHistory(historyService.getHistoryList(task));
                if (taskUser.getHasRead() == 0) {
                    taskUser.setHasRead(1);
                    taskUserRepository.save(taskUser);
                }
                return taskDetail;

            }
        }catch (Exception e){
            log.error("Error while getting task detail", e);
            throw new RuntimeException( e.getMessage());
        }
    }

    @Override
    public boolean evictTask(Long task_id) {
            try {
                Task task = taskRepository.findById(task_id).orElseThrow(() -> new RuntimeException("Task not found"));
                List<TaskUser> taskUsers = taskUserRepository.findByTask(task);
                for (TaskUser taskUser : taskUsers){
                    if(taskUser.getRole() != 0 && taskUser.getHasRead() == 1){
                        return false;
                    }
                }
                for (TaskUser taskUser : taskUsers){
                    if (taskUser.getRole() != 0)
                        taskUserRepository.delete(taskUser);
                }
                task.setStatus(4);
                taskRepository.save(task);
                historyService.addHistory(userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found")),null, task, "Thu hồi nhiệm vụ", 4);

                return true;
            }catch(Exception e){
                log.error("Error while evicting task with id: {}", task_id, e);
                return false;
            }
    }

    @Override
    @Transactional
    public TaskDetailResponse createTask(CreateTaskRequest createTaskRequest) {
        try {
            Task task = Task.builder()
                    .title(createTaskRequest.getTitle())
                    .content(createTaskRequest.getContent())
                    .priority(createTaskRequest.getPriority())
                    .createdDate(createTaskRequest.getCreated_date())
                    .expiredDate(createTaskRequest.getExpired_date())
                    .state(0)
                    .progress(0)
                    .status(0)
                    .assignDepartment(departmentRepository.findById(createTaskRequest.getAssign_department()).orElse(null))
                    .assignUser(userRepository.findById(createTaskRequest.getAssign_user()).orElse(null))
                    .targetDepartment(departmentRepository.findById(createTaskRequest.getTarget_department()).orElse(null))
                    .targetUser(userRepository.findById(createTaskRequest.getTarget_user()).orElse(null))
                    .project(projectRepository.findById(createTaskRequest.getProject_id()).orElse(null))
                    .build();
            if(task.getPriority() == 2) task.setState(4);
            Task result = taskRepository.save(task);
            for(CreateTaskUserRequest createTaskUserRequest : createTaskRequest.getCombinations()){
                TaskUser taskUser = TaskUser.builder()
                        .createdDate(createTaskUserRequest.getCreated_date())
                        .role(2)
                        .task(result)
                        .user(userRepository.findById(createTaskUserRequest.getCombination_user()).orElse(null))
                        .department(departmentRepository.findById(createTaskUserRequest.getCombination_department()).orElse(null))
                        .hasRead(0)
                        .build();
                taskUserRepository.save(taskUser);
                notificationService.addNotification(result, userRepository.findById(createTaskRequest.getAssign_user()).orElseThrow(() -> new RuntimeException("User not found")), userRepository.findById(createTaskUserRequest.getCombination_user()).orElseThrow(() -> new RuntimeException("User not found")), "Bạn được giao nhiệm vụ", 0);
            }
            taskUserRepository.save(TaskUser.builder()
                            .createdDate(createTaskRequest.getCreated_date())
                            .hasRead(0)
                            .role(0)
                            .department(departmentRepository.findById(createTaskRequest.getAssign_department()).orElse(null))
                            .user(userRepository.findById(createTaskRequest.getAssign_user()).orElse(null))
                            .task(result)
                    .build());
            taskUserRepository.save(TaskUser.builder()
                    .createdDate(createTaskRequest.getCreated_date())
                    .hasRead(0)
                    .role(1)
                    .department(departmentRepository.findById(createTaskRequest.getTarget_department()).orElse(null))
                    .user(userRepository.findById(createTaskRequest.getTarget_user()).orElse(null))
                    .task(result)
                    .build());
            notificationService.addNotification(result, userRepository.findById(createTaskRequest.getAssign_user()).orElseThrow(() -> new RuntimeException("User not found")), userRepository.findById(createTaskRequest.getTarget_user()).orElseThrow(() -> new RuntimeException("User not found")), "Bạn được giao nhiệm vụ", 0);
            var context = SecurityContextHolder.getContext();
            User user = userRepository.findByUsername(context.getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));
            historyService.addHistory(user, userRepository.findById(createTaskRequest.getTarget_user()).orElseThrow(() -> new RuntimeException("User not found")), result, createTaskRequest.getContent(), 0);
            TaskDetailResponse taskDetailResponse=TaskDetail(result.getId());
            TaskUser taskUser = taskUserRepository.findByUserAndTask(user, result);
            taskUser.setHasRead(0);
            taskUserRepository.save(taskUser);

            //create link file
            fileService.init(result.getProject().getId()+" "+result.getId());
            return taskDetailResponse;
        }catch (Exception e){
            log.error("Error while creating task", e);
            throw new RuntimeException( e.getMessage());
        }
    }
    @Override
    @Transactional
    public boolean processingHandover(HandoverTaskRequest handoverTaskRequest) {
        try {
            Task task = taskRepository.findById(handoverTaskRequest.getTask_id()).orElseThrow(() -> new RuntimeException("Task not found"));
            User targetUser = userRepository.findById(handoverTaskRequest.getTarget_user_id()).orElseThrow(() -> new RuntimeException("User not found"));
            Department targetDepartment = departmentRepository.findById(handoverTaskRequest.getTarget_department_id()).orElseThrow(() -> new RuntimeException("Department not found"));
            var context = SecurityContextHolder.getContext();
            User targetOld = task.getTargetUser();
            User user = userRepository.findByUsername(context.getAuthentication().getName()).orElseThrow(() -> new RuntimeException("User not found"));

            if(task.getTargetUser().getId() != handoverTaskRequest.getTarget_user_id()){
                if(!taskUserRepository.existsByTaskAndUserAndDepartment(
                        task,
                        targetUser,
                        targetDepartment
                        )){
                    taskUserRepository.save(
                            TaskUser.builder()
                                    .createdDate(new Date())
                                    .role(1)
                                    .task(task)
                                    .user(targetUser)
                                    .department(targetDepartment)
                                    .hasRead(0)
                                    .build());
                }else {
                    TaskUser taskUser = taskUserRepository.findByUserAndTaskAndDepartment(targetUser, task, targetDepartment);
                    taskUser.setRole(1);
                    taskUser.setUpdatedDate(new Date());
                    taskUserRepository.save(taskUser);

                }
                TaskUser taskUser = taskUserRepository.findByUserAndTaskAndDepartment(task.getTargetUser(), task,task.getTargetDepartment());
                taskUser.setRole(3);
                taskUser.setUpdatedDate(new Date());
                taskUserRepository.save(taskUser);
                historyService.addHistory(user, targetUser, task, handoverTaskRequest.getContent(), 1);
                notificationService.addNotification(task, task.getTargetUser(),targetUser,"Chuyển xử lý",1);
                task.setTargetUser(targetUser);
                task.setTargetDepartment(targetDepartment);
                taskRepository.save(task);
            }
            for(TaskUserRequest taskUserRequest : handoverTaskRequest.getCombinations()){
                User coordinatorNew =  userRepository.findById(taskUserRequest.getCombination_id()).orElseThrow(() -> new RuntimeException("User not found"));
                    TaskUser taskUser = TaskUser.builder()
                            .createdDate(new Date())
                            .role(2)
                            .task(task)
                            .user(coordinatorNew)
                            .department(departmentRepository.findById(taskUserRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("Department not found")))
                            .hasRead(0)
                            .build();
                    taskUserRepository.save(taskUser);
                    historyService.addHistory(user, userRepository.findById(taskUserRequest.getCombination_id()).orElseThrow(() -> new RuntimeException("User not found")), task, handoverTaskRequest.getContent(), 2);
                    notificationService.addNotification(task,targetOld,coordinatorNew,"Chuyển xử lý",1);
            }
            return true;
        }catch (Exception e){
            log.error("Error while processing handover", e);
            return false;
        }
    }

    @Override
    public boolean updateProcessing(Long task_user_id,Integer progress) {
        try{
            Task task = taskUserRepository.findById(task_user_id).orElseThrow(() -> new RuntimeException("Task not found")).getTask();
            task.setProgress(progress);
            taskRepository.save(task);
            return true;
        }catch (Exception e){
            log.error("Error while updating processing", e);
            return false;
        }
    }

    @Override
    @Transactional
    public boolean deleteTask(Long task_id) {
        try {
            if(!taskRepository.existsByIdAndStatus(task_id, 4)){
                log.error("Task not delete");
                return false;
            }
            Task task = taskRepository.findById(task_id).orElseThrow(() -> new RuntimeException("Task not found"));
            taskUserRepository.deleteAllByTask(task);
            notificationService.deleteNotification(task);
            commentService.deleteComment(task);
            reportService.deleteReport(task);
            fileService.deleteFile(task);
            historyService.deleteHistory(task);
            taskRepository.delete(task);
         return true;
        }catch (Exception e){
            log.error("Error while deleting task", e);
            return false;
        }
    }

    @Override
    public boolean returnTask(Long task_id, String content) {
        try {
            Task task = taskRepository.findById(task_id).orElseThrow(() -> new RuntimeException("Task not found"));
            historyService.addHistory(task.getTargetUser(), task.getAssignUser(), task, content, 6);
            notificationService.addNotification(task, task.getTargetUser(), task.getAssignUser(), content, 6);
            List<TaskUser> taskUsers = taskUserRepository.findByTask(task);
            for(TaskUser taskUser : taskUsers){
                if(taskUser.getRole() == 1 || taskUser.getRole() == 3){
                    taskUserRepository.delete(taskUser);
                }
            }
            task.setTargetUser(null);
            task.setTargetDepartment(null);
            taskRepository.save(task);
            return true;
        }catch (Exception e){
            log.error("Error while returning task", e);
            return false;
        }
    }

    @Override
    public TaskOfDay taskOfTheDay() {
        try {
            var context = SecurityContextHolder.getContext();
            String username = context.getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
            Specification<Task> spec = Specification.where(TaskSpecification
                    .hasParticipant(user)
                    .and(TaskSpecification.expiredDateToday()));
            List<Task> tasks = taskRepository.findAll(spec);
            List<TaskSearchResponse> taskSearchResponses = new ArrayList<>();
            for(Task task : tasks){
                TaskUser taskUser = taskUserRepository.findByUserAndTask(user, task);
                TaskSearchResponse taskSearchResponse = taskMapper.toTaskSearchResponse(taskUser);
                taskSearchResponses.add(taskSearchResponse);
            }
            TaskOfDay taskOfDay = TaskOfDay.builder()
                    .tasks(taskSearchResponses)
                    .avgTimeCompleted(1)
                    .build();
            List<Task> taskOfDays = taskRepository.findDistinctByTaskUsersUserAndStatus(user, 5);
            if(taskOfDays.size() >= 100){
                long time = 0L;
                for (Task task : taskOfDays){
                    time = time + timeCompleted(task);
                }
                taskOfDay.setAvgTimeCompleted((int) (time/taskOfDays.size()));
            }
            return taskOfDay;
        }catch (Exception e){
            log.error("Error while getting task of the day", e);
            throw new RuntimeException( e.getMessage());
        }
    }

    @Override
    @Transactional
    public boolean leaveProcessingTime(List<ProcessingTimeRequest> processingTimeRequests, Long id) {
        try {
            for(ProcessingTimeRequest processingTimeRequest : processingTimeRequests){
                Task task = taskRepository.findById(processingTimeRequest.getTask_id()).orElseThrow(() -> new RuntimeException("Task not found"));
                System.out.println(processingTimeRequest.getNew_expired_date());
                task.setExpiredDate(processingTimeRequest.getNew_expired_date());
                taskRepository.save(task);
            }
            Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
            task.setState(0);
            taskRepository.save(task);
            return true;
        }catch (Exception e){
            log.error("Error while leaving processing time", e);
            return false;
        }
    }

    @Override
    public List<TaskLeaveProcessingTimeResponse> leaveProcessingTimeDetail() {
        try {
            var context = SecurityContextHolder.getContext();
            String username = context.getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
            List<Task> tasks = taskRepository.findByTargetUserAndState(user, 4);
            List<TaskLeaveProcessingTimeResponse> taskLeaveProcessingTimeResponses = new ArrayList<>();
            for(Task task : tasks){
                List<Task> taskProcessing = taskRepository.findByProjectAndTargetUser(task.getProject(), user);
                List<TaskLeave> taskLeaves = new ArrayList<>();
                for(Task task1 : taskProcessing){
                    if(task1.getStatus() != 5 && task1.getPriority() != 2){
                        Date new_expired_date = ProcessingTime.calculateOverlapAndNewExpire(task.getCreatedDate(),task.getExpiredDate(),task1.getCreatedDate(),task1.getExpiredDate(),task1.getProject().getExpiredDate());
                        if(new_expired_date != task1.getExpiredDate()){
                            TaskLeave taskLeave = taskMapper.toTaskLeave(task1);
                            taskLeave.setNew_expired_date(new_expired_date);
                            taskLeaves.add(taskLeave);
                        }
                    }
                }
                if(!taskLeaves.isEmpty()){
                    taskLeaveProcessingTimeResponses.add(
                            TaskLeaveProcessingTimeResponse.builder()
                                    .taskImportant(taskMapper.toTaskLeave(task))
                                    .TaskLeaves(taskLeaves)
                                    .build()
                    );
                }
            }
            return taskLeaveProcessingTimeResponses;
        }catch (Exception e){
            log.error("Error while getting leave processing time detail", e);
            throw new RuntimeException( e.getMessage());
        }
    }

    @Override
    @Transactional
    public boolean updateTask(UpdateTaskResponse updateTaskResponse) {
        try {
            Task task = taskRepository.findById(updateTaskResponse.getTask_id()).orElseThrow(() -> new RuntimeException("Task not found"));
            User assignUser = userRepository.findById(updateTaskResponse.getAssign_user()).orElseThrow(() -> new RuntimeException("User not found"));
            Department assignDepartment = departmentRepository.findById(updateTaskResponse.getAssign_department()).orElseThrow(() -> new RuntimeException("Department not found"));
            User targetUser = userRepository.findById(updateTaskResponse.getTarget_user()).orElseThrow(() -> new RuntimeException("User not found"));
            Department targetDepartment = departmentRepository.findById(updateTaskResponse.getTarget_department()).orElseThrow(() -> new RuntimeException("Department not found"));
            task.setTitle(updateTaskResponse.getTitle());
            task.setContent(updateTaskResponse.getContent());
            task.setPriority(updateTaskResponse.getPriority());
            task.setExpiredDate(updateTaskResponse.getExpired_date());
            task.setCreatedDate(updateTaskResponse.getCreated_date());
            task.setProject(projectRepository.findById(updateTaskResponse.getProject_id()).orElseThrow(() -> new RuntimeException("Project not found")));
            task.setAssignUser(assignUser);
            task.setAssignDepartment(assignDepartment);
            task.setTargetUser(targetUser);
            task.setTargetDepartment(targetDepartment);
            if(task.getPriority() == 2) task.setState(4);
            taskRepository.save(task);
            List<TaskUser> taskUsers = taskUserRepository.findByTask(task);
            for(TaskUser taskUser : taskUsers){
                if(taskUser.getRole() == 2){
                    taskUserRepository.delete(taskUser);
                }
                else if(taskUser.getRole() == 0){
                    if(assignUser.getId() != taskUser.getUser().getId() || assignDepartment.getId() != taskUser.getDepartment().getId()){
                        taskUser.setUser(assignUser);
                        taskUser.setDepartment(assignDepartment);
                        taskUserRepository.save(taskUser);
                    }
                }
                else if(taskUser.getRole() == 1){
                    if(targetUser.getId() != taskUser.getUser().getId() || targetDepartment.getId() != taskUser.getDepartment().getId()){
                        taskUser.setUser(targetUser);
                        taskUser.setDepartment(targetDepartment);
                        taskUserRepository.save(taskUser);
                    }
                }else if(taskUser.getRole() == 3){
                    if(targetUser.getId() == taskUser.getUser().getId() && targetDepartment.getId() == taskUser.getDepartment().getId()){
                        taskUserRepository.delete(taskUser);
                    }else if(assignUser.getId() == taskUser.getUser().getId() && assignDepartment.getId() == taskUser.getDepartment().getId()){
                        taskUserRepository.delete(taskUser);
                    }
                }
            }
            for(UpdateTaskUserResponse updateTaskUserResponse : updateTaskResponse.getCombinations()){
                User user = userRepository.findById(updateTaskUserResponse.getCombination_user()).orElseThrow(() -> new RuntimeException("User not found"));
                Department department = departmentRepository.findById(updateTaskUserResponse.getCombination_department()).orElseThrow(() -> new RuntimeException("Department not found"));
                taskUserRepository.save(
                        TaskUser.builder()
                                .createdDate(new Date())
                                .role(2)
                                .task(task)
                                .user(user)
                                .department(department)
                                .hasRead(0)
                                .isPin(0)
                                .updatedDate(new Date())
                                .build()
                );
            }
          return true;
        }catch (Exception e){
            log.error("Error while updating task", e);
            return false;
        }
    }

    private Long timeCompleted(Task task){
        Instant createdDate = task.getCreatedDate().toInstant();
        Instant completedDate = task.getCompletedDate().toInstant();
        Duration duration = Duration.between(createdDate, completedDate);
        return duration.toHours();
    }
}
