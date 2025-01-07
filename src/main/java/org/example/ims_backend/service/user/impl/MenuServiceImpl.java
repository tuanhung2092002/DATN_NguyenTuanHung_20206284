package org.example.ims_backend.service.user.impl;

import jakarta.persistence.*;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.MenuManager;
import org.example.ims_backend.dto.user.GeneralResponse;
import org.example.ims_backend.dto.user.menu.response.MenuResponse;
import org.example.ims_backend.dto.user.response.*;
import org.example.ims_backend.dto.user.user.request.UpdateUserRequest;
import org.example.ims_backend.dto.user.user.response.UserResponse;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.DepartmentUserMapper;
import org.example.ims_backend.mapper.ProjectMapper;
import org.example.ims_backend.mapper.UserMapper;
import org.example.ims_backend.repository.*;
import org.example.ims_backend.service.user.MenuService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MenuServiceImpl implements MenuService {
    MenuRepository menuRepository;
    EntityManager entityManager;
    UserRepository userRepository;
    UserMapper userMapper;
    NotificationUserRepository notificationUserRepository;
    DepartmentRepository departmentRepository;
    DepartmentUserRepository departmentUserRepository;
    DepartmentUserMapper departmentUserMapper;
    DepartmentProjectRepository departmentProjectRepository;
    ProjectMapper projectMapper;
    PasswordEncoder passwordEncoder;
    @Override
    public List<MenuResponse> getMenu() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
        List<Menu> menus = menuRepository.findAll();
        MenuManager manager = new MenuManager();
        for (Menu menu : menus){
            Long parentMenuId = null;
            String[] codeSegments = menu.getMenuCode().split("\\.");
            String query = menu.getQuery();
            Query qery = entityManager.createQuery(query);
            qery.setParameter("userId", user.getId());
            List results = qery.getResultList();
            int totalTask =  results.size();
            if (codeSegments.length >= 2){
                try {
                    parentMenuId = Long.parseLong(codeSegments[codeSegments.length - 2]);
                } catch (NumberFormatException e){
                    log.error("Invalid parentMenuId in menu code: {}", menu.getMenuCode(), e);
                }
            }
            manager.addMenu(
                    menu.getId(),
                    menu.getMenuName(),
                    menu.getMenuCode(),
                    totalTask,
                    parentMenuId,
                    menu.getIsActive()
            );
        }
        return manager.getAllMenus();
    }

    @Override
    public GeneralResponse getOverview() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
        List<MenuResponse> menus = getMenu();
        int num_notification = notificationUserRepository.countByReceiverUserAndHasRead(user,0);
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentGeneral> departmentGenerals = new ArrayList<>();

        for (Department department : departments){
            String []code = department.getDepartmentCode().split("\\."); ;
            Long parentDepartmentId = null;
            if (code.length >= 2){
                try {
                    parentDepartmentId = Long.parseLong(code[code.length - 2]);
                } catch (NumberFormatException e){
                    log.error("Invalid parentDepartmentId in department code: {}", department.getDepartmentCode(), e);
                }
            }
            List<DepartmentUser> departmentUsers = departmentUserRepository.findByDepartment(department);
            List<UserDepartmentGenal> userDepartmentGenals = new ArrayList<>();
            for (DepartmentUser departmentUser : departmentUsers){
                userDepartmentGenals.add(UserDepartmentGenal.builder()
                        .user_id(departmentUser.getUser().getId())
                        .user_name(departmentUser.getUser().getUsername())
                                .full_name(departmentUser.getUser().getFullName())
                                .IsDepartmentMain(departmentUser.getDepartmentMain() ==1)
                                .position_id(departmentUser.getPosition().getId())
                                .position_name(departmentUser.getPosition().getPositionName())
                        .build());
            }
            departmentGenerals.add(DepartmentGeneral.builder()
                            .department_id(department.getId())
                            .department_code(department.getDepartmentCode())
                            .department_name(department.getDepartmentName())
                            .parent_department_id(parentDepartmentId)
                            .users(userDepartmentGenals)
                    .build());
        }
        return GeneralResponse.builder()
                .menus(menus)
                .departments(departmentGenerals)
                .number_notification(num_notification)
                .userCurrent(getMyInfo(user))
                .build();
    }

    @Override
    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
        return userMapper.toMyInfoUp(user);
    }

    @Override
    public boolean updateMyInfo(UpdateUserRequest updateUserRequest) {
        try {
            var context = SecurityContextHolder.getContext();
            String username = context.getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
            user.setFirstName(updateUserRequest.getFirstName());
            user.setLastName(updateUserRequest.getLastName());
            user.setFullName(updateUserRequest.getFullName());
            user.setPhone(updateUserRequest.getPhone());
            user.setGender(updateUserRequest.getGender());
            user.setDateOfBirth(updateUserRequest.getDateOfBirth());
            user.setHomeTown(updateUserRequest.getHomeTown());
            user.setEmail(updateUserRequest.getEmail());
            user.setUsername(updateUserRequest.getUsername());
            userRepository.save(user);
            return true;
        } catch (Exception e){
            log.error("Error when update my info", e);
            return false;
        }


    }

    @Override
    public boolean changePassword(String oldPassword, String newPassword) {
        try {
            var context = SecurityContextHolder.getContext();
            String username = context.getAuthentication().getName();
            User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("false"));
            if (!passwordEncoder.matches(oldPassword, user.getPassword())){
                return false;
            }
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }catch (Exception e){
            log.error("Error when change password", e);
            return false;
        }
    }

    private MyInfo getMyInfo(User user){
        MyInfo myInfo = userMapper.toMyInfo(user);
        List<DepartmentUser> departmentUsers = departmentUserRepository.findByUser(user);
        List<MyDepartment> myDepartments = departmentUserMapper.toMyDepartment(departmentUsers);
        for(MyDepartment myDepartment : myDepartments){
            List<DepartmentProject> departmentProjects = departmentProjectRepository.findDepartmentProjectByDepartment(departmentRepository.findById(myDepartment.getDepartment_id()).orElseThrow(() -> new RuntimeException("false")));
            List<MyProject> myProjects = projectMapper.toMyProject(departmentProjects);
            myDepartment.setProjects(myProjects);
        }
        myInfo.setDepartments(myDepartments);
        return myInfo;
    }
}
