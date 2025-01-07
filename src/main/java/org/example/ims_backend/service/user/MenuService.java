package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.GeneralResponse;
import org.example.ims_backend.dto.user.menu.response.MenuResponse;
import org.example.ims_backend.dto.user.user.request.UpdateUserRequest;
import org.example.ims_backend.dto.user.user.response.UserResponse;

import java.util.List;

public interface MenuService {
    List<MenuResponse> getMenu();
    GeneralResponse getOverview();
    UserResponse getMyInfo();
    boolean updateMyInfo(UpdateUserRequest updateUserRequest);
    boolean changePassword(String oldPassword, String newPassword);
}
