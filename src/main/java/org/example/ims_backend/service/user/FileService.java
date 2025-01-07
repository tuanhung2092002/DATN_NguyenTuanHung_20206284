package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.Task;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    List<FileResponse> getFiles(Task task);
    void deleteFile(Task task);
    boolean storeFile(MultipartFile file , Long taskId);
    Resource downloadFile(Long id);
    void init(String link);
    boolean deleteFile(Long id);
}
