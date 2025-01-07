package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.ErrorCode;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentDTO;
import org.example.ims_backend.dto.admin.request.AppException;
import org.example.ims_backend.dto.admin.request.DepartmentRequest;
import org.example.ims_backend.dto.admin.request.UserCreationRequest;
import org.example.ims_backend.dto.admin.request.UserUpdateRequest;
import org.example.ims_backend.dto.admin.response.GeneralResponse;
import org.example.ims_backend.dto.admin.response.UpdateUserResponse;
import org.example.ims_backend.dto.admin.response.UserResponse;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.repository.DepartmentRepository;
import org.example.ims_backend.repository.DepartmentUserRepository;
import org.example.ims_backend.repository.PositionRepository;
import org.example.ims_backend.repository.specification.UserSpecification;
import org.example.ims_backend.entity.*;
import org.example.ims_backend.mapper.UserMapper;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.admin.DepartmentService;
import org.example.ims_backend.service.admin.EmailService;
import org.example.ims_backend.service.admin.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class UserServiceImpl implements UserService {
     UserRepository userRepository;
     UserMapper userMapper;
     PasswordEncoder passwordEncoder;
     DepartmentUserRepository departmentUserRepository;
     PositionRepository positionRepository;
     DepartmentRepository departmentRepository;
     DepartmentService departmentService;
     EmailService emailService;
     @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean createUser(UserCreationRequest request) {
         try {
                if (userRepository.existsByUsername(request.getUsername())) {
                    throw new AppException(ErrorCode.USER_EXISTED);
                }
                User user = userMapper.toUser(request);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                User result = userRepository.save(user);
                for(DepartmentRequest departmentRequest: request.getDepartments()){
                    DepartmentUser departmentUser = new DepartmentUser();
                    departmentUser.setDepartmentMain(departmentRequest.isIsMain() ? 1 : 0);
                    departmentUser.setUser(result);
                    departmentUser.setDepartment(departmentRepository.findById(departmentRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("false")));
                    departmentUser.setPosition(positionRepository.findById(departmentRequest.getPosition_id()).orElseThrow(() -> new RuntimeException("false")));
                    departmentUserRepository.save(departmentUser);
                }
                return true;
            } catch (Exception e) {
                log.error("Error when create user", e);
                return false;
         }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponse> getUsers(Pageable pageable, String username, String fullname, Boolean active, Boolean role, Long position) {
        log.info("In method get users");
        Specification<User> spec = Specification.where(UserSpecification
                .hasUsername(username))
                .and(UserSpecification.hasFullname(fullname))
                .and(UserSpecification.hasActive(active))
                .and(UserSpecification.hasRole(role))
                .and(UserSpecification.hasPosition(position));
        Page<User> users = userRepository.findAll(spec, pageable);
        List<UserResponse> userResponses = users.stream().map(userMapper::toUserResponse).toList();
        return new PageImpl<>(userResponses, pageable, users.getTotalElements());
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean updatePassword(Long id, String password) {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            emailService.sendEmail(password, user.getEmail(), user.getUsername());
            return true;
        }catch (Exception e){
            log.error("Error when update password", e);
            return false;
        }

    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public GeneralResponse getGeneralInfo() {

        List<Position> positions = positionRepository.findAll();
        List<GeneralResponse.Position> positionResponses = positions.stream().map(o -> {
            GeneralResponse.Position position = new GeneralResponse.Position();
            position.setPositionId(o.getId());
            position.setPositionName(o.getPositionName());
            return position;
        }).toList();
        List<DepartmentDTO> departments = departmentService.getDepartment();
        return GeneralResponse.builder()
                .position(positionResponses)
                .departments(departments)
                .build();
    }

    @Override
    public List<UserResponse> getFullUsers() {
        return userRepository.findAllByIsActiveAndIsAdmin(1,0).stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public UpdateUserResponse getUser(Long id) {
         User user = userRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("false"));
        List<DepartmentUser> departmentUsers = departmentUserRepository.findByUser(user);

        return userMapper.toUpdateUserResponse(user,departmentUsers);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean updateUser(UserUpdateRequest request) {
        try {
            User user = userRepository.findById(request.getUser_id()).orElseThrow(() -> new RuntimeException("false"));
            user = userMapper.updateUser(user,request);
            userRepository.save(user);
            List<DepartmentUser> departmentUsers = departmentUserRepository.findByUser(user);
            for (DepartmentRequest departmentRequest: request.getDepartments()){
                if (!departmentUserRepository.existsByUserAndDepartment(user, departmentRepository.findById(departmentRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("false")))){
                    DepartmentUser departmentUser = new DepartmentUser();
                    departmentUser.setUser(user);
                    departmentUser.setDepartment(departmentRepository.findById(departmentRequest.getDepartment_id()).orElseThrow(() -> new RuntimeException("false")));
                    departmentUser.setDepartmentMain(departmentRequest.isIsMain() ? 1 : 0);
                    Optional<Position> position = positionRepository.findById(departmentRequest.getPosition_id());
                    departmentUser.setPosition(position.orElseThrow(() -> new RuntimeException("false")));
                    departmentUserRepository.save(departmentUser);
                }
            }
            for(DepartmentUser departmentUser: departmentUsers){
                boolean isExist = false;
                for (DepartmentRequest departmentRequest: request.getDepartments()){

                    if(departmentUser.getDepartment().getId().equals(departmentRequest.getDepartment_id())){
                        isExist = true;
                        departmentUser.setDepartmentMain(departmentRequest.isIsMain() ? 1 : 0);
                        Optional<Position> position = positionRepository.findById(departmentRequest.getPosition_id());
                        departmentUser.setPosition(position.orElseThrow(() -> new RuntimeException("false")));
                        departmentUserRepository.save(departmentUser);
                        break;
                    }
                }
                if(!isExist){
                    departmentUserRepository.delete(departmentUser);
                }
            }

            return true;
        } catch (Exception e) {
            log.error("Error when update user", e);
            return false;
        }
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        }catch (Exception e){
            log.error("Error when delete user", e);
            return false;
        }

    }
}
