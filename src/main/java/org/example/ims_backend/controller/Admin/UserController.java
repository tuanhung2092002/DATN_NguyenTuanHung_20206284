package org.example.ims_backend.controller.Admin;

import jakarta.validation.Valid;
import org.example.ims_backend.common.Active;
import org.example.ims_backend.common.Role;
import org.example.ims_backend.dto.admin.request.UserCreationRequest;
import org.example.ims_backend.dto.admin.request.UserUpdateRequest;
import org.example.ims_backend.dto.admin.response.ApiReponse;
import org.example.ims_backend.dto.admin.response.GeneralResponse;
import org.example.ims_backend.dto.admin.response.UpdateUserResponse;
import org.example.ims_backend.dto.admin.response.UserResponse;
import org.example.ims_backend.service.admin.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
@RestController
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;
    @PostMapping("/createUser")
    boolean createUser(@RequestBody @Valid UserCreationRequest request) {
        return userService.createUser(request);

    }
    @GetMapping("/users")
    ResponseEntity<Page<UserResponse>> getUsers(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "15", required = false) int size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String fullname,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) Boolean isAdmin,
            @RequestParam(required = false) Long position
    ) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("User: {}", authentication.getName());
        log.warn("Role: {}", authentication.getAuthorities());
        PageRequest pageable = PageRequest.of(page,size, Sort.by(Sort.Direction.DESC, "createdDate"));
        Page<UserResponse> users = userService.getUsers(pageable, username, fullname, active, isAdmin, position);
        return ResponseEntity.ok(users);
    }
    @GetMapping("/fullUsers")
    List<UserResponse> getFullUsers() {
        return userService.getFullUsers();
    }
    @GetMapping("/users/{id}")
    UpdateUserResponse getUser(@PathVariable Long id) {

        return userService.getUser(id);
    }
    @PutMapping("/users")
    boolean updateUser(@RequestBody UserUpdateRequest user) {

        return userService.updateUser(user);
    }
    @PutMapping("/upPassword")
    boolean updatePassword(@RequestParam String password, @RequestParam Long idUser) {
        return userService.updatePassword(idUser, password);
    }
    @DeleteMapping("/deletedUser/{id}")
    boolean deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);

    }
    @GetMapping("/general")
    GeneralResponse getGeneral() {
        return userService.getGeneralInfo();
    }
}
