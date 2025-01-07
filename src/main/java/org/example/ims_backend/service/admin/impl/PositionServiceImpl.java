package org.example.ims_backend.service.admin.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.dto.admin.positionDTO.request.PositionRequest;
import org.example.ims_backend.dto.admin.positionDTO.response.PositionResponse;
import org.example.ims_backend.entity.Position;
import org.example.ims_backend.mapper.PositionMapper;
import org.example.ims_backend.repository.PositionRepository;
import org.example.ims_backend.service.admin.PositionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Service
@Slf4j
public class PositionServiceImpl implements PositionService {
    PositionRepository positionRepository;
    PositionMapper positionMapper;
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<PositionResponse> getPositions() {
        List<Position> positions = positionRepository.findAll();
        return positions.stream().map(positionMapper ::toPositionResponse).toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean createPosition(PositionRequest positionRequest) {
        try{
            Position position = positionMapper.toPosition(positionRequest);
            positionRepository.save(position);
            return true;
        } catch (Exception e){
            log.error("Error creating position", e);
            return false;
        }
    }

    @Override
    public boolean updatePosition(PositionRequest positionRequest) {
        try {
            System.out.println(positionRequest.getPosition_id()+" "+positionRequest.getPosition_name()+" "+positionRequest.isIsActive());
            Position position = positionRepository.findById(positionRequest.getPosition_id()).orElseThrow(() -> new RuntimeException("false"));
            position.setPositionName(positionRequest.getPosition_name());
            position.setIsActive(positionRequest.isIsActive() ? 1 : 0);
            positionRepository.save(position);
            return true;
        } catch (Exception e){
            log.error("Error updating position", e);
            return false;
        }
    }

}
