package org.example.ims_backend.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.ims_backend.dto.response.DashBoard;
import org.example.ims_backend.entity.Statistic;
import org.example.ims_backend.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/statistic")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true , level = AccessLevel.PRIVATE)
public class StatisticController {
    @Autowired
    StatisticService statisticService;

    @GetMapping("/get")
    public DashBoard getStatistic(
            @RequestParam(required = false) LocalDateTime from,
            @RequestParam(required = false)LocalDateTime to,
            @RequestParam(required = false)Long department_assign_id,
            @RequestParam(required = false)Long user_assign_id,
            @RequestParam(required = false)Long user_handle_id,
            @RequestParam(required = false)Long department_handle_id,
            @RequestParam(required = false)Integer status,
            @RequestParam(required = false)Integer priority,
            @RequestParam(required = false)Long user_id
            ){
        return statisticService.getStatistic(from, to, department_assign_id, user_assign_id, user_handle_id, department_handle_id, status, priority,user_id);
    }
}
