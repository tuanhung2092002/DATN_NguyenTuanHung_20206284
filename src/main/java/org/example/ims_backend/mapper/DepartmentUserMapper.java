package org.example.ims_backend.mapper;

import org.example.ims_backend.common.Active;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentUserDTO;
import org.example.ims_backend.dto.user.response.DepartmentGeneral;
import org.example.ims_backend.dto.user.response.MyDepartment;
import org.example.ims_backend.dto.user.response.UserDepartmentGenal;
import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.entity.Project;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartmentUserMapper {
    default List<DepartmentUserDTO> toDTO(List<DepartmentUser> departmentUsers) {
        List<DepartmentUserDTO> departmentUserDTOS = new ArrayList<>();
        for(DepartmentUser departmentUser : departmentUsers) {

            departmentUserDTOS.add(DepartmentUserDTO.builder()
                            .user_id(departmentUser.getUser().getId())
                            .user_name(departmentUser.getUser().getFullName())
                            .IsActive(departmentUser.getUser().getIsActive() == 1)
                            .IsMain(departmentUser.getDepartmentMain() == 1)
                            .position_id(departmentUser.getPosition().getId())
                            .position_name(departmentUser.getPosition().getPositionName())
                        .build());
        }
        return departmentUserDTOS;
    }
    default List<MyDepartment> toMyDepartment(List<DepartmentUser> departmentUsers ) {
        List<MyDepartment> myDepartments = new ArrayList<>();
        for(DepartmentUser departmentUser : departmentUsers) {
            myDepartments.add(
                    MyDepartment.builder()
                            .department_id(departmentUser.getDepartment().getId())
                            .department_name(departmentUser.getDepartment().getDepartmentName())
                            .position_id(departmentUser.getPosition().getId())
                            .position_name(departmentUser.getPosition().getPositionName())
                            .build()
            );
        }
        return myDepartments;
    }
    default DepartmentGeneral toDepartmentGeneral(List<DepartmentUser> departmentUsers) {
        List<UserDepartmentGenal> userDepartmentGenals = new ArrayList<>();
        for(DepartmentUser departmentUser : departmentUsers) {
            userDepartmentGenals.add(UserDepartmentGenal.builder()
                    .user_id(departmentUser.getUser().getId())
                    .user_name(departmentUser.getUser().getUsername())
                            .full_name(departmentUser.getUser().getFullName())
                            .user_email(departmentUser.getUser().getEmail())
                    .IsDepartmentMain(departmentUser.getDepartmentMain() == 1)
                    .position_id(departmentUser.getPosition().getId())
                    .position_name(departmentUser.getPosition().getPositionName())
                    .build());
        }
        Long parentDepartmentId = null;
        if (departmentUsers.get(0).getDepartment().getDepartmentCode().split("\\.").length >= 2) {
            try {
                parentDepartmentId = Long.parseLong(departmentUsers.get(0).getDepartment().getDepartmentCode().split("\\.")[departmentUsers.get(0).getDepartment().getDepartmentCode().split("\\.").length - 2]);
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }
        return DepartmentGeneral.builder()
                .department_id(departmentUsers.get(0).getDepartment().getId())
                .department_name(departmentUsers.get(0).getDepartment().getDepartmentName())
                .parent_department_id(parentDepartmentId)
                .department_code(departmentUsers.get(0).getDepartment().getDepartmentCode())
                .users(userDepartmentGenals)
                .build();
    }
}
