package org.example.ims_backend.repository.specification;

import jakarta.persistence.criteria.Join;
import org.example.ims_backend.entity.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

public class TaskSpecification {
    public static Specification<Task> getTaskByPriority(Integer priority) {
        return (root, query, builder) -> {
            if (priority == null) {
                return builder.conjunction();
            }
            return builder.equal(root.get("priority"), priority);
        };
    }
    public static Specification<Task> getTaskByDepartment(Long departmentId) {
        return (root, query, criteriaBuilder) -> {
            if(departmentId == null) {
                return criteriaBuilder.conjunction();
            }
            // Join Task với TaskUser
            Join<Task, TaskUser> taskUserJoin = root.join("taskUsers");

            // Lọc theo userId
            return criteriaBuilder.equal(taskUserJoin.get("department").get("id"), departmentId);
        };
    }
    public static Specification<Task> getTaskByStatus(Integer status) {
        return (root, query, builder) -> {
            if (status == null) {
                return builder.conjunction();
            }
            return builder.equal(root.get("status"), status);
        };
    }
    public static Specification<Task> getTaskByTitle(String title) {
        return (root, query, builder) -> {
            if (title == null || title.isEmpty()) {
                return builder.conjunction();
            }
            String likePattern = "%" + title.toLowerCase() + "%";
            return builder.or(
                    builder.like(builder.lower(root.get("title")), likePattern));
        };
    }

    public static Specification<Task> hasUser(Long userId) {
        return (root, query, criteriaBuilder) -> {
            if(userId == null) {
                return criteriaBuilder.conjunction();
            }
            // Join Task với TaskUser
            Join<Task, TaskUser> taskUserJoin = root.join("taskUsers");

            // Lọc theo userId
            return criteriaBuilder.equal(taskUserJoin.get("user").get("id"), userId);
        };
    }
    public static Specification<Task> createdDateBetween(LocalDateTime from, LocalDateTime to) {
        return (root, query, criteriaBuilder) -> {
            if (from != null && to != null) {
                return criteriaBuilder.between(root.get("createdDate"), from, to);
            } else if (from != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("createdDate"), from);
            } else if (to != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("createdDate"), to);
            } else {
                return criteriaBuilder.conjunction();
            }
        };
    }
    public static Specification<Task> expiredDateBetween(LocalDateTime from, LocalDateTime to) {
        return (root, query, criteriaBuilder) -> {
            if (from != null && to != null) {
                return criteriaBuilder.between(root.get("expiredDate"), from, to);
            } else if (from != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("expiredDate"), from);
            } else if (to != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("expiredDate"), to);
            } else {
                return criteriaBuilder.conjunction();
            }
        };

    }
    public static Specification<Task> hasParticipant(User user) {
        return (root, query, criteriaBuilder) -> {
            // Join Task với TaskUser
            Join<Task, TaskUser> taskUserJoin = root.join("taskUsers");

            // Điều kiện: Người tìm kiếm phải tham gia
            return criteriaBuilder.equal(taskUserJoin.get("user"), user);
        };
    }
    public static Specification<Task> expiredDateToday() {
        return (root, query, criteriaBuilder) -> {
            // Lấy ngày hôm nay, loại bỏ thời gian
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            Date today = calendar.getTime();

            // So sánh chỉ phần ngày của `expiredDate` với ngày hôm nay
            return criteriaBuilder.equal(criteriaBuilder.function("DATE", Date.class, root.get("expiredDate")), today);
        };
    }


}
