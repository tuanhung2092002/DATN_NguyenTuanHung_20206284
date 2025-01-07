package org.example.ims_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.State;
import org.example.ims_backend.dto.response.DashBoard;
import org.example.ims_backend.dto.response.DashBoardPriority;
import org.example.ims_backend.dto.response.DashBoardUser;
import org.example.ims_backend.dto.user.task.response.TaskStatisticResponse;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.StatisticMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.repository.specification.ProjectSpecification;
import org.example.ims_backend.repository.specification.StatisticSpecification;
import org.example.ims_backend.repository.specification.TaskSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
public class StatisticServiceImpl implements StatisticService {
    ProjectRepository projectRepository;
    DepartmentRepository departmentRepository;
    UserRepository userRepository;
    TaskRepository taskRepository;
    StatisticMapper statisticMapper;
    TaskUserRepository taskUserRepository;
    @Override
    public DashBoard getStatistic(LocalDateTime from, LocalDateTime to, Long department_assign_id, Long user_assign_id, Long user_handle_id, Long department_handle_id, Integer status, Integer priority , Long user_id) {

            Department department_assign = null;
            if(department_assign_id != null) department_assign = departmentRepository.findById(department_assign_id)
                    .orElse(null);
            Department  department_handle = null;
            if(department_handle_id != null) department_handle = departmentRepository.findById(department_handle_id)
                    .orElse(null);
            User user_assign = null;
            if(user_assign_id != null) user_assign = userRepository.findById(user_assign_id)
                    .orElse(null);
            User user_handle = null;
            if(user_handle_id != null) user_handle = userRepository.findById(user_handle_id)
                    .orElse(null);
            User user = null;
            if(user_id != null)  user = userRepository.findById(user_id)
                    .orElse(null);
        try {

            Specification<Task> specification = Specification.where(
                    StatisticSpecification.hasParticipant(user))
                    .and(StatisticSpecification.getTaskByDate(from,to))
                    .and(StatisticSpecification.getTaskByPriority(priority))
                    .and(StatisticSpecification.getTaskByStatus(status))
                    .and(StatisticSpecification.getTaskByAssign(department_assign,user_assign))
                    .and(StatisticSpecification.getTaskByHandle(department_handle,user_handle)

            );
            List<Task> tasks = taskRepository.findAll(specification);
            return  DashBoard.builder()
                    .Project(StatisticProject(tasks))
                    .Department(StatisticDepartment(tasks))
                    .User(StatisticUser(tasks))
                    .Priority(StatisticPriority(tasks))
                    .build();
        }catch (Exception e){
            log.error(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
    private List<Statistic> StatisticProject (List<Task> tasks){
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            if(map.containsKey(task.getProject().getId())){
                Statistic statistic = map.get(task.getProject().getId());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                    }else {
                        statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        statistic.setPending_on_time(statistic.getPending_on_time()+1);
                    }else {
                        statistic.setPending_overdue(statistic.getPending_overdue()+1);
                    }
                }
            }else {
                int pending_on_time = 0;
                int pending_overdue = 0;
                int completed_on_time = 0;
                int completed_overdue = 0;
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        completed_overdue = 1;
                    }else {
                        completed_on_time = 1;
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        pending_on_time = 1;
                    }else {
                        pending_overdue = 1;
                    }
                }
                Statistic statistic = Statistic.builder()
                        .id(task.getProject().getId())
                        .name(task.getProject().getName())
                        .pending_on_time(pending_on_time)
                        .pending_overdue(pending_overdue)
                        .completed_on_time(completed_on_time)
                        .completed_overdue(completed_overdue)
                        .total_task(1)
                        .build();
                map.put(task.getProject().getId(),statistic);
            }
        }
        return new ArrayList<>(map.values());
    }
    private List<Statistic> StatisticDepartment (List<Task> tasks) {
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            List<Department> departments = taskUserRepository.findDistinctDepartmentByTaskId(task.getId());
            for(Department department : departments){
                if(map.containsKey(department.getId())){
                    Statistic statistic = map.get(department.getId());
                    statistic.setTotal_task(statistic.getTotal_task()+1);
                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                        }else {
                            statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            statistic.setPending_on_time(statistic.getPending_on_time()+1);
                        }else {
                            statistic.setPending_overdue(statistic.getPending_overdue()+1);
                        }
                    }
                }else {
                    int pending_on_time = 0;
                    int pending_overdue = 0;
                    int completed_on_time = 0;
                    int completed_overdue = 0;
                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            completed_overdue = 1;
                        }else {
                            completed_on_time = 1;
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            pending_on_time = 1;
                        }else {
                            pending_overdue = 1;
                        }
                    }
                    Statistic statistic = Statistic.builder()
                            .id(department.getId())
                            .name(department.getDepartmentName())
                            .pending_on_time(pending_on_time)
                            .pending_overdue(pending_overdue)
                            .completed_on_time(completed_on_time)
                            .completed_overdue(completed_overdue)
                            .total_task(1)
                            .build();
                    map.put(department.getId(),statistic);
                }
            }

        }
        return new ArrayList<>(map.values());
    }
    private DashBoardUser StatisticUser (List<Task> tasks){
        DashBoardUser dashBoardUser = DashBoardUser.builder()
                .total_task(0)
                .pending_on_time(0)
                .pending_overdue(0)
                .completed_on_time(0)
                .completed_overdue(0)
                .statistics(null)
                .build();
        Map<Long,Statistic> map = new HashMap<>();
        for(Task task : tasks){
            List<User> users = taskUserRepository.findDistinctUserByTaskId(task.getId());
            for(User user : users){
                dashBoardUser.setTotal_task(dashBoardUser.getTotal_task()+1);
                if(map.containsKey(user.getId())){
                    Statistic statistic = map.get(user.getId());
                    statistic.setTotal_task(statistic.getTotal_task()+1);

                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                            dashBoardUser.setCompleted_overdue(dashBoardUser.getCompleted_overdue()+1);
                        }else {
                            statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                            dashBoardUser.setCompleted_on_time(dashBoardUser.getCompleted_on_time()+1);
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            statistic.setPending_on_time(statistic.getPending_on_time()+1);
                            dashBoardUser.setPending_on_time(dashBoardUser.getPending_on_time()+1);
                        }else {
                            statistic.setPending_overdue(statistic.getPending_overdue()+1);
                            dashBoardUser.setPending_overdue(dashBoardUser.getPending_overdue()+1);
                        }
                    }
                }else {
                    int pending_on_time = 0;
                    int pending_overdue = 0;
                    int completed_on_time = 0;
                    int completed_overdue = 0;
                    if(task.getStatus() == 5){
                        if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                            dashBoardUser.setPending_overdue(dashBoardUser.getPending_overdue()+1);
                            completed_overdue = 1;
                        }else {
                            dashBoardUser.setCompleted_on_time(dashBoardUser.getCompleted_on_time()+1);
                            completed_on_time = 1;
                        }
                    }else {
                        if(task.getExpiredDate().compareTo(new Date()) >= 0){
                            dashBoardUser.setPending_on_time(dashBoardUser.getPending_on_time()+1);
                            pending_on_time = 1;
                        }else {
                            dashBoardUser.setPending_overdue(dashBoardUser.getPending_overdue()+1);
                            pending_overdue = 1;
                        }
                    }
                    Statistic statistic = Statistic.builder()
                            .id(user.getId())
                            .name(user.getFullName())
                            .pending_on_time(pending_on_time)
                            .pending_overdue(pending_overdue)
                            .completed_on_time(completed_on_time)
                            .completed_overdue(completed_overdue)
                            .total_task(1)
                            .build();
                    map.put(user.getId(),statistic);
                }
            }
        }
        dashBoardUser.setStatistics(new ArrayList<>(map.values()));
        return dashBoardUser;
    }
    private List<DashBoardPriority> StatisticPriority (List<Task> tasks){
        Map<Integer,List<Task>> map = new HashMap<>();
        Set<Integer> set = new HashSet<>();
        for (Task task : tasks){
         if(task.getCompletedDate() == null) {
             if(map.containsKey(LocalDate.now().getYear())){
                 List<Task> list = map.get(LocalDate.now().getYear());
                 list.add(task);
                 map.put(LocalDate.now().getYear(),list);

             }else {
                    List<Task> list = new ArrayList<>();
                    list.add(task);
                    map.put(LocalDate.now().getYear(),list);
             }
             set.add(LocalDate.now().getYear());
         }else {
                if(map.containsKey(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear())){
                    List<Task> list = map.get(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear());
                    list.add(task);
                    map.put(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear(),list);
                }else {
                    List<Task> list = new ArrayList<>();
                    list.add(task);
                    map.put(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear(),list);
                }
                set.add(task.getCompletedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear());
         }
        }
        List<DashBoardPriority> dashBoardPriorities = new ArrayList<>();
        for (Integer year : set){
            List<Task> list = map.get(year);
            Map<Long,Statistic> mapS = new HashMap<>();
            mapS.put(0L,Statistic.builder()
                            .id(0L)
                            .name("Binh thuong")
                            .total_task(0)
                            .pending_on_time(0)
                            .pending_overdue(0)
                            .completed_on_time(0)
                            .completed_overdue(0)
                    .build());
            mapS.put(1L,Statistic.builder()
                    .id(1L)
                    .name("Trong tam")
                    .total_task(0)
                    .pending_on_time(0)
                    .pending_overdue(0)
                    .completed_on_time(0)
                    .completed_overdue(0)
                    .build());
            mapS.put(2L,Statistic.builder()
                    .id(2L)
                    .name("Rat trong tam")
                    .total_task(0)
                    .pending_on_time(0)
                    .pending_overdue(0)
                    .completed_on_time(0)
                    .completed_overdue(0)
                    .build());
            for(Task task : list){
                Statistic statistic = mapS.get((long) task.getPriority());
                statistic.setTotal_task(statistic.getTotal_task()+1);
                if(task.getStatus() == 5){
                    if(task.getCompletedDate().compareTo(task.getExpiredDate()) > 0){
                        statistic.setCompleted_overdue(statistic.getCompleted_overdue()+1);
                    }else {
                        statistic.setCompleted_on_time(statistic.getCompleted_on_time()+1);
                    }
                }else {
                    if(task.getExpiredDate().compareTo(new Date()) >= 0){
                        statistic.setPending_on_time(statistic.getPending_on_time()+1);
                    }else {
                        statistic.setPending_overdue(statistic.getPending_overdue()+1);
                    }
                }
            }
            dashBoardPriorities.add(
                    DashBoardPriority.builder()
                    .year(Long.valueOf(year))
                    .statistics(new ArrayList<>(mapS.values()))
                    .build());
        }
        return dashBoardPriorities;
    }
}
