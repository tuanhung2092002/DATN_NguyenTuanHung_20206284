package org.example.ims_backend.service.admin.impl;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.DepartmentManager;
import org.example.ims_backend.dto.admin.departmentDTO.request.DepartmentRequest;
import org.example.ims_backend.dto.admin.departmentDTO.request.DepartmentUserRequest;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentDTO;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentUserDTO;
import org.example.ims_backend.entity.Department;
import org.example.ims_backend.entity.DepartmentUser;
import org.example.ims_backend.mapper.DepartmentUserMapper;
import org.example.ims_backend.repository.DepartmentRepository;
import org.example.ims_backend.repository.DepartmentUserRepository;
import org.example.ims_backend.repository.PositionRepository;
import org.example.ims_backend.repository.UserRepository;
import org.example.ims_backend.service.admin.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class DepartmentServiceImpl implements DepartmentService {

    DepartmentRepository departmentRepository;
    DepartmentUserMapper departmentUserMapper;
    DepartmentUserRepository departmentUserRepository;
    PositionRepository positionRepository;
    UserRepository userRepository;
    @Override
    public List<DepartmentDTO> getDepartment() {
        List<Department> departments = departmentRepository.findAll();
        DepartmentManager manager = new DepartmentManager();

        for (Department department : departments) {
            Long parentDepartmentId = null;
            String parentDepartmentName = null;

            // Kiểm tra mã phòng ban cha trong mã phòng ban
            String[] codeSegments = department.getDepartmentCode().split("\\.");
            if (codeSegments.length >= 2) {
                try {
                    parentDepartmentId = Long.parseLong(codeSegments[codeSegments.length - 2]);
                    parentDepartmentName = departmentRepository.findById(parentDepartmentId).orElseThrow(() -> new Exception("false")).getDepartmentName();
                } catch (Exception e) {
                    log.error("Invalid parentDepartmentId in department code: {}", department.getDepartmentCode(), e);
                }
            }

            // Thêm phòng ban vào hệ thống
            manager.addDepartment(
                    department.getId(),
                    department.getDepartmentName(),
                    department.getIsActive() == 1 ,
                    parentDepartmentId,
                    parentDepartmentName,
                    department.getDepartmentCode()
            );
        }

        // Trả về tất cả phòng ban theo cấu trúc cây
        return manager.getAllDepartments();
    }

    @Override
    public boolean createDepartment(DepartmentRequest request) {
        try{
            Department parent_department = departmentRepository.findById(request.getParent_department_id()).orElse(null);
            assert parent_department != null;
            Department department = Department.builder()
                    .departmentName(request.getDepartment_name())
                    .departmentCode(parent_department.getDepartmentCode())
                    .isActive(0)
                    .build();
            departmentRepository.save(department);
            List<Department> departments = departmentRepository.findByDepartmentCodeAndDepartmentName(department.getDepartmentCode(), department.getDepartmentName());
            departments.sort((d1, d2) -> d2.getId().compareTo(d1.getId()));
            Department lastDepartment = departments.get(0);
            lastDepartment.setDepartmentCode(lastDepartment.getDepartmentCode() + "." + lastDepartment.getId());
            departmentRepository.save(lastDepartment);
            return true;
        }catch (Exception e){
            log.error("Error when create department", e);
            return false;
        }
    }

    @Override
    public boolean updateDepartment(Long id, DepartmentRequest request) {

        try {
            Department parentDepartment = departmentRepository.findById(request.getParent_department_id()).orElse(null);
            Department department = departmentRepository.findById(id).orElse(null);
            assert parentDepartment != null;

            assert department != null;
            department.setDepartmentCode(parentDepartment.getDepartmentCode() + "." + id);
            department.setDepartmentName(request.getDepartment_name());
            department.setIsActive(request.isIsActive() ? 1 : 0);
            departmentRepository.save(department);
            return true;
        }catch (Exception e){
            log.error("Error when update department", e);
            return false;
        }
    }

    @Override
    public List<DepartmentUserDTO> getUsersOfDepartment(Long id) {

        return departmentUserMapper.toDTO(departmentUserRepository.findByDepartment(departmentRepository.findById(id).orElse(null)));
    }

    @Override
    public boolean updateUsersOfDepartment(Long id, List<DepartmentUserRequest> users) {
        try {
            Department department = departmentRepository.findById(id).orElse(null);
            assert department != null;
            List<DepartmentUser> departmentUsers = departmentUserRepository.findByDepartment(department);
            for (DepartmentUserRequest userRequest : users) {
                if (!departmentUserRepository.existsByUserAndDepartment(userRepository.findById(userRequest.getUser_id()).orElse(null),department)) {
                    DepartmentUser departmentUser = new DepartmentUser();
                    departmentUser.setDepartment(department);
                    departmentUser.setUser(userRepository.findById(userRequest.getUser_id()).orElse(null));
                    departmentUser.setPosition(positionRepository.findById(userRequest.getPosition_id()).orElse(null));
                    departmentUser.setDepartmentMain(userRequest.isIsMain() ? 1 : 0);
                    departmentUserRepository.save(departmentUser);
                }
            }
            for (DepartmentUser departmentUser : departmentUsers) {
                boolean isExist = false;
                for (DepartmentUserRequest user : users) {
                    if (departmentUser.getUser().getId().equals(user.getUser_id())) {
                        departmentUser.setPosition(positionRepository.findById(user.getPosition_id()).orElse(null));
                        departmentUser.setDepartmentMain(user.isIsMain() ? 1 : 0);
                        departmentUserRepository.save(departmentUser);
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    departmentUserRepository.delete(departmentUser);
                }
            }
            return true;
        }catch (Exception e){
            log.error("Error when update users of department", e);
            return false;
        }
    }
}
