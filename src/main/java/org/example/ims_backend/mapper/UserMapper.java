
package org.example.ims_backend.mapper;


import org.example.ims_backend.dto.admin.request.UserCreationRequest;
import org.example.ims_backend.dto.admin.request.UserUpdateRequest;
import org.example.ims_backend.dto.admin.response.DepartmentResponse;
import org.example.ims_backend.dto.admin.response.UpdateUserResponse;
import org.example.ims_backend.dto.admin.response.UserResponse;
import org.example.ims_backend.dto.user.response.MyInfo;
import org.example.ims_backend.dto.user.user.request.UpdateUserRequest;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.entity.User;
import org.mapstruct.Mapper;

import java.util.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    default
    User toUser(UserCreationRequest userCreationRequest){
        User user = new User();
        user.setUsername(userCreationRequest.getUsername());
        user.setPassword(userCreationRequest.getPassword());
        user.setEmail(userCreationRequest.getEmail());
        user.setIsAdmin(userCreationRequest.isIsAdmin() ? 1 : 0);
        user.setIsActive(userCreationRequest.isIsActive() ? 1 : 0);
        user.setPhone(userCreationRequest.getPhone());
        user.setGender(userCreationRequest.getGender());
        user.setDateOfBirth( userCreationRequest.getDateofbirth());
        user.setHomeTown(userCreationRequest.getHometown());
        user.setLastName(userCreationRequest.getLastname());
        user.setFirstName(userCreationRequest.getFirstname());
        user.setFullName(userCreationRequest.getFullname());


        return user;
    }
    default User updateUser(User user, UserUpdateRequest userUpdateRequest){
        user.setUsername(userUpdateRequest.getUsername());
        user.setIsAdmin(userUpdateRequest.isIsAdmin() ? 1 : 0);
        user.setIsActive(userUpdateRequest.isIsActive() ? 1 : 0);
        user.setPhone(userUpdateRequest.getPhone());
        user.setGender(userUpdateRequest.getGender());
        user.setDateOfBirth( userUpdateRequest.getDateofbirth());
        user.setHomeTown(userUpdateRequest.getHometown());
        user.setFirstName(userUpdateRequest.getFirstname());
        user.setLastName(userUpdateRequest.getLastname());
        user.setFullName(userUpdateRequest.getFullname());
        user.setEmail(userUpdateRequest.getEmail());
        return user;
    }
    default UserResponse toUserResponse(User user){
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .active(user.getIsActive() == 1)
                .build();
    }
    default UpdateUserResponse toUpdateUserResponse(User user, List<DepartmentUser> departmentUsers){
        List<DepartmentResponse> departmentResponses = new ArrayList<>();
        for (DepartmentUser departmentUser : departmentUsers){
            departmentResponses.add(DepartmentResponse.builder()
                            .department_id(departmentUser.getDepartment().getId())
                            .department_name(departmentUser.getDepartment().getDepartmentName())
                            .position_id(departmentUser.getPosition().getId())
                            .position_name(departmentUser.getPosition().getPositionName())
                            .IsMain(departmentUser.getDepartmentMain() == 1)
                    .build());
            }
        return UpdateUserResponse.builder()
                .user_id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .hometown(user.getHomeTown())
                .gender(user.getGender())
                .email(user.getEmail())
                .dateOfBirth(user.getDateOfBirth())
                .IsActive(user.getIsActive() == 1)
                .IsAdmin(user.getIsAdmin() == 1)
                .department(departmentResponses)
                .build();
    }
    default MyInfo toMyInfo( User user){
        return MyInfo.builder()
                .user_id(user.getId())
                .user_name(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .dateOfBirth(user.getDateOfBirth())
                .fullName(user.getFullName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .homeTown(user.getHomeTown())
                .gender(user.getGender())
                .IsActive(user.getIsActive() == 1)
                .IsAdmin(user.getIsAdmin() == 1)
                .build();
    }
    default org.example.ims_backend.dto.user.user.response.UserResponse toMyInfoUp(User user) {
        return org.example.ims_backend.dto.user.user.response.UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .homeTown(user.getHomeTown())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .build();
    }

}
