package org.example.ims_backend.controller.User;

import org.example.ims_backend.dto.user.GeneralResponse;
import org.example.ims_backend.dto.user.menu.response.MenuResponse;
import org.example.ims_backend.dto.user.user.request.UpdateUserRequest;
import org.example.ims_backend.dto.user.user.response.UserResponse;
import org.example.ims_backend.service.user.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/user")
@RestController
public class MenuController {
    @Autowired
    private MenuService menuService;
    @GetMapping("/menus")
    public List<MenuResponse> getMenu() {
        return menuService.getMenu();
    }
    @GetMapping("/overview")
    public GeneralResponse getOverview() {
        return menuService.getOverview();
    }
    @GetMapping("/myInfo")
    public UserResponse getMyInfo() {
        return menuService.getMyInfo();
    }
    @PutMapping("/updateMyInfo")
    public boolean updateMyInfo(@RequestBody UpdateUserRequest updateUserRequest) {
        return menuService.updateMyInfo(updateUserRequest);
    }
    @PutMapping("/changePassword")
    public boolean changePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword
    ) {
        return menuService.changePassword(oldPassword, newPassword);
    }
}
