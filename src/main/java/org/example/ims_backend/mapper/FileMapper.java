package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.file.response.FileResponse;
import org.example.ims_backend.entity.File;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FileMapper {
    default FileResponse toFileResponse(File file){
        return FileResponse.builder()
                .file_id(file.getId())
                .task_id(file.getTask().getId())
                .user_id(file.getUser().getId())
                .file_name(file.getFileName())
                .file_path(file.getFilePath())
                .extension(file.getExtension())
                .size(file.getSize())
                .created_date(file.getCreatedDate())
                .updated_date(file.getUpdatedDate())
                .deleted_date(file.getDeletedDate())
                .can_delete(true)
                .build();
    }
}
