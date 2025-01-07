package org.example.ims_backend.repository.specification;

import org.example.ims_backend.entity.Project;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.Date;

public class ProjectSpecification {
    public static Specification<Project> hasKeyword(String keyword) {
        return (root, query, builder) -> {
            if (keyword == null || keyword.isEmpty()) {
                return builder.conjunction();
            }
            String likePattern = "%" + keyword.toLowerCase() + "%";
            return builder.like(builder.lower(root.get("name")), likePattern);
        };
    }
    public static Specification<Project> createdDateBetween(Date from, Date to) {
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
    public static Specification<Project> expiredDateBetween(Date from, Date to) {
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

}
