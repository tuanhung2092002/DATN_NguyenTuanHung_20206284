package org.example.ims_backend.service;

import org.example.ims_backend.dto.response.DashBoard;
import org.example.ims_backend.entity.Statistic;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface StatisticService {
    DashBoard getStatistic(LocalDateTime from, LocalDateTime to, Long department_assign_id, Long user_assign_id, Long user_handle_id, Long department_handle_id, Integer status, Integer priority, Long user_id);
}
