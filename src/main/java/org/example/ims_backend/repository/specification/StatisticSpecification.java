package org.example.ims_backend.repository.specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.example.ims_backend.entity.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StatisticSpecification {
    public static Specification<Task> getTaskByPriority(Integer priority) {
        return (root, query, builder) -> {
            if (priority == null) {
                return builder.conjunction();
            }
            return builder.equal(root.get("priority"), priority);
        };
    }
    public static Specification<Task> getTaskByProject(Project project) {
        return (root, query, criteriaBuilder) -> {
            if(project == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("project"), project);
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
    public static Specification<Task> getTaskByAssign(Department department , User user) {
        return (root, query, criteriaBuilder) -> {

            if (department != null && user == null) {
                return criteriaBuilder.equal(root.get("assignDepartment"), department);
            }
            if (department != null && user != null) {
                return criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("assignDepartment"), department),
                        criteriaBuilder.equal(root.get("assignUser"), user)
                );
            }
            return criteriaBuilder.conjunction();
        };
    }
    public static Specification<Task> getTaskByHandle(Department department , User user) {
        return (root, query, criteriaBuilder) -> {
            if (department != null && user == null) {
                return criteriaBuilder.equal(root.get("targetDepartment"), department);
            }
            else if (department != null && user != null) {
                return criteriaBuilder.and(
                        criteriaBuilder.equal(root.get("targetDepartment"), department),
                        criteriaBuilder.equal(root.get("targetUser"), user)
                );
            }
            return criteriaBuilder.conjunction();
        };
    }
    public static Specification<Task> getTaskByDate(LocalDateTime from, LocalDateTime to) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Nếu from và to đều khác null, kiểm tra khoảng between
            if (from != null && to != null) {
                predicates.add(criteriaBuilder.between(root.get("expiredDate"), from, to));
                predicates.add(criteriaBuilder.between(root.get("createdDate"), from, to));
                predicates.add(criteriaBuilder.between(root.get("completedDate"), from, to));
            }
            // Nếu chỉ có from, kiểm tra lớn hơn hoặc bằng
            else if (from != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("expiredDate"), from));
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createdDate"), from));
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("completedDate"), from));
            }
            // Nếu chỉ có to, kiểm tra nhỏ hơn hoặc bằng
            else if (to != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("expiredDate"), to));
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("createdDate"), to));
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("completedDate"), to));
            }

            // Kết hợp các điều kiện bằng criteriaBuilder.or
            if (!predicates.isEmpty()) {
                return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
            }

            // Nếu không có điều kiện nào, trả về conjunction (luôn đúng)
            return criteriaBuilder.conjunction();
        };
    }
    public static Specification<Task> hasParticipant(User user) {
        return (root, query, criteriaBuilder) -> {
            if (user == null) {
                return criteriaBuilder.conjunction();
            }
            // Join Task với TaskUser
            Join<Task, TaskUser> taskUserJoin = root.join("taskUsers");

            // Điều kiện: Người tìm kiếm phải tham gia
            return criteriaBuilder.equal(taskUserJoin.get("user"), user);
        };
    }
}
