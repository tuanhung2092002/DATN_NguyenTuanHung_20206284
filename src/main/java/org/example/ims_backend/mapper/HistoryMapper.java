package org.example.ims_backend.mapper;

import org.example.ims_backend.dto.user.history.response.HistoryResponse;
import org.example.ims_backend.entity.History;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HistoryMapper {
    default HistoryResponse toHistoryResponse(History history){
        return HistoryResponse.builder()
                .history_id(history.getId())
                .task_id(history.getTask().getId())
                .create_user_id(history.getCreatedUser().getId())
                .content(history.getContent())
                .label_name(history.getCreatedUser().getFullName()+"-"+history.getContent())
                .created_date(history.getCreatedDate())
                .build();
    }
}
