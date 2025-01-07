package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.user.history.response.HistoryResponse;
import org.example.ims_backend.entity.History;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.TaskUser;
import org.example.ims_backend.entity.User;
import org.example.ims_backend.mapper.HistoryMapper;
import org.example.ims_backend.repository.HistoryRepository;
import org.example.ims_backend.repository.TaskUserRepository;
import org.example.ims_backend.service.user.HistoryService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class HistoryServiceImpl implements HistoryService {
    HistoryRepository historyRepository;
    HistoryMapper historyMapper;
    TaskUserRepository taskUserRepository;
    @Override
    public void addHistory(User createUser, User receiveUser, Task task, String content, int status) {
            historyRepository.save(
                    History.builder()
                            .CreatedUser(createUser)
                            .receiveUser(receiveUser)
                            .task(task)
                            .status(status)
                            .content(content)
                            .build());
    }

    @Override
    public List<HistoryResponse> getHistoryList(Task task) {
        List<History> histories = historyRepository.findAllByTask(task);
        List<HistoryResponse> historyResponses = new ArrayList<>();

        for (History history : histories) {
            // Map status to a title
            String title = mapStatusToTitle(history.getStatus());

            // Fetch taskUser only once
            TaskUser taskUser = taskUserRepository.findByUserAndTask(history.getCreatedUser(), task);

            // Build response
            historyResponses.add(HistoryResponse.builder()
                    .history_id(history.getId())
                    .task_id(task.getId())
                    .create_user_id(history.getCreatedUser().getId())
                    .content(history.getContent())
                    .label_name(history.getCreatedUser().getFullName() + " - " + title)
                    .created_date(history.getCreatedDate())
                    .role(taskUser != null ? taskUser.getRole() : null)
                    .department_id(taskUser != null
                            ? taskUser.getDepartment().getId()
                            : null)
                    .build());
        }
        return historyResponses;
    }
    private String mapStatusToTitle(int status) {
        return switch (status) {
            case 0 -> "Tạo nhiệm vụ";
            case 1 -> "Chuyển chủ trì";
            case 2 -> "Thêm người phối hợp";
            case 3 -> "Hoàn thành nhiệm vụ";
            case 4 -> "Thu hồi nhiệm vụ";
            case 5 -> "Kết thúc nhiệm vụ";
            case 6 -> "Trả lại nhiệm vụ";
            default -> "Trạng thái không xác định";
        };
    }
    @Override
    public void deleteHistory(Task task) {
        try {
            historyRepository.deleteAllByTask(task);
        }catch (Exception e){
            log.error("Error in deleteHistory", e);
        }
    }
}
