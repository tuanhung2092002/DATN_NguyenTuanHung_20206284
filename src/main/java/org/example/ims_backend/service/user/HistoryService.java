package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.history.response.HistoryResponse;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.entity.User;

import java.util.List;

public interface HistoryService {
    void addHistory(User createUser, User receiveUser, Task task, String content,int status);
    List<HistoryResponse> getHistoryList(Task task);
    void deleteHistory(Task task);
}
