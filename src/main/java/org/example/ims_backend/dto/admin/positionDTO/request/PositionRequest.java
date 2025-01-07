package org.example.ims_backend.dto.admin.positionDTO.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PositionRequest {
    Long position_id;
    String position_name;
    boolean IsActive;
}
