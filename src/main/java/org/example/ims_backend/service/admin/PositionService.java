package org.example.ims_backend.service.admin;

import org.example.ims_backend.dto.admin.positionDTO.request.PositionRequest;
import org.example.ims_backend.dto.admin.positionDTO.response.PositionResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PositionService {
    List<PositionResponse> getPositions();
    boolean createPosition(PositionRequest positionRequest);
    boolean updatePosition(PositionRequest positionRequest);
}
