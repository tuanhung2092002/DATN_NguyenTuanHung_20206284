package org.example.ims_backend.controller.User;
import org.example.ims_backend.service.user.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequestMapping("/api/user")
@RestController
public class FileController {
    @Autowired
    private FileService fileService;
    @PostMapping("/saveFiles")
    public boolean saveFiles(@RequestParam("file") MultipartFile file , @RequestParam Long task_id) {
        return fileService.storeFile(file , task_id);
    }
    @GetMapping("/downloadFile/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException {
        Resource file = fileService.downloadFile(id);
        System.out.println(file.getURI());
        String fileName = file.getFilename();
        assert fileName != null;
        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
        encodedFileName = encodedFileName.replaceAll("\\+", "%20"); // Thay dấu cộng (+) bằng khoảng trắng

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFileName)
                .body(file);
    }
    @DeleteMapping("/deleteFile/{fileId}")
    public boolean deleteFile(@PathVariable Long fileId) {
        return fileService.deleteFile(fileId);
    }
}
