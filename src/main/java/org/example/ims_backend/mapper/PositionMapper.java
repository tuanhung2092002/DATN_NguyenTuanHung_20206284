package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.admin.positionDTO.request.PositionRequest;
import org.example.ims_backend.dto.admin.positionDTO.response.PositionResponse;
import org.example.ims_backend.entity.Position;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PositionMapper {

    default
    PositionResponse toPositionResponse(Position position){
        return PositionResponse.builder()
                .position_id(position.getId())
                .position_name(position.getPositionName())
                .IsActive(position.getIsActive() == 1)
                .build();
    }
    default
    Position toPosition(PositionRequest positionRequest){
        return Position.builder()
                .positionName(positionRequest.getPosition_name())
                .isActive(positionRequest.isIsActive() ? 1 : 0)
                .build();
    }
    // List<PositionResponse> toPositionResponseList(List<Position> positions);
    // List<Position> toPositionList(List<PositionRequest> positionRequests);
}
