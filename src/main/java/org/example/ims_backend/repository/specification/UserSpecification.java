package org.example.ims_backend.repository.specification;

import jakarta.persistence.criteria.Join;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {
    public static Specification<User> hasUsername(String username) {
        return (root, query, builder) -> {
            if (username == null || username.isEmpty()) {
                return builder.conjunction();
            }
            String likePattern = "%" + username.toLowerCase() + "%";
            return builder.or(
                    builder.like(builder.lower(root.get("username")), likePattern));
        };
    }
    public static Specification<User> hasFullname(String fullname) {
        return (root, query, builder) -> {
            if (fullname == null || fullname.isEmpty()) {
                return builder.conjunction();
            }
            String likePattern = "%" + fullname.toLowerCase() + "%";
            return builder.or(
                    builder.like(builder.lower(root.get("fullName")), likePattern));
        };
    }
    public static Specification<User> hasActive(Boolean active) {
        return (root, query, builder) -> {
            if (active == null) {
                return builder.conjunction();
            }
            int status = (active) ? 1 : 0;
            return builder.equal(root.get("isActive"), status);
        };
    }
    public static Specification<User> hasRole(Boolean role) {
        return (root, query, builder) -> {
            if (role == null) {
                return builder.conjunction();
            }
            int isAdmin = (role) ? 1 : 0;
            return builder.equal(root.get("IsAdmin"), isAdmin);
        };
    }
    public static Specification<User> hasPosition(Long position) {
        return (root, query, builder) -> {
            if (position == null || position == 0) {
                return builder.conjunction();
            }
            Join<Object, Object> departmentUserJoin = root.join("departmentUsers");
            Join<Object, Object> positionJoin = departmentUserJoin.join("position");
            return builder.equal(positionJoin.get("id"), position);
        };
    }

}
