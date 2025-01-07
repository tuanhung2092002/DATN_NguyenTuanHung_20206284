package org.example.ims_backend.dto.user.file.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FileResponse {
    Long file_id;
    Long task_id;
    Long user_id;
    String user_name;
    String file_name;
    String file_path;
    String extension;
    Long size;
    boolean can_delete;
    Date created_date;
    Date updated_date;
    Date deleted_date;
}
