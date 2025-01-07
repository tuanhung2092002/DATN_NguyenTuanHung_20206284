package org.example.ims_backend.common;

import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentDTO;
import org.example.ims_backend.dto.admin.departmentDTO.response.DepartmentUserDTO;
import org.example.ims_backend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

public class DepartmentManager {
    private final Map<Long, DepartmentDTO> departmentMap = new HashMap<>();
    private final Map<Long,DepartmentDTO> resultMap = new HashMap<>();
    // Method to add a department to the map
    public void addDepartment(Long departmentId, String departmentName, boolean isactive, Long parentDepartmentId,String parentDepartmentName, String departmentCode) {
        // Kiểm tra xem phòng ban đã tồn tại chưa
        if (departmentMap.containsKey(departmentId)) {
            System.out.println("Phòng ban với ID " + departmentId + " đã tồn tại.");
            return;
        }

        DepartmentDTO parentDepartment = null;

        // Tìm phòng ban cha nếu có ID hợp lệ
        if (parentDepartmentId != null) {
            parentDepartment = departmentMap.get(parentDepartmentId);  // Lấy phòng ban cha từ map
            if (parentDepartment == null) {
                System.out.println("Không tìm thấy phòng ban cha với ID " + parentDepartmentId);
                return;
            }
        }

        // Tạo phòng ban mới và thêm vào bản đồ
        DepartmentDTO newDepartment = new DepartmentDTO(departmentId, departmentName, isactive, parentDepartmentId,parentDepartmentName, departmentCode);
        departmentMap.put(departmentId, newDepartment);

        // Thêm phòng ban con vào phòng ban cha nếu có
        if (parentDepartment != null) {
            parentDepartment.addSubDepartment(newDepartment);
        }else{
            resultMap.put(departmentId,newDepartment);
        }

        System.out.println("Phòng ban " + departmentName + " đã được thêm thành công.");
    }

    // Method to get all departments
    public List<DepartmentDTO> getAllDepartments() {
        // Trả về danh sách phòng ban theo dạng cấu trúc cây
        return new ArrayList<>(resultMap.values());
    }
}
