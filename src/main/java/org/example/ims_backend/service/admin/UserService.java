package org.example.ims_backend.service.admin;

import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.dto.admin.request.UserCreationRequest;
import org.example.ims_backend.dto.admin.request.UserUpdateRequest;
import org.example.ims_backend.dto.admin.response.GeneralResponse;
import org.example.ims_backend.dto.admin.response.UpdateUserResponse;
import org.example.ims_backend.dto.admin.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    boolean createUser(UserCreationRequest request);
    Page<UserResponse> getUsers(Pageable pageable, String username, String fullname, Boolean active, Boolean role, Long position);
    UpdateUserResponse getUser(Long id);
    boolean updateUser(UserUpdateRequest user);
    boolean deleteUser(Long id);
    boolean updatePassword(Long id,String password);
    GeneralResponse getGeneralInfo();
    List<UserResponse> getFullUsers();
}
