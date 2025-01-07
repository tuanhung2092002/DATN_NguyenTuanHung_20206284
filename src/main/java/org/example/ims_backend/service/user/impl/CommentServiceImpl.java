package org.example.ims_backend.service.user.impl;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.ims_backend.common.CommentManager;
import org.example.ims_backend.dto.user.comment.response.CommentResponse;
import org.example.ims_backend.entity.Comment;
import org.example.ims_backend.entity.Task;
import org.example.ims_backend.repository.CommentRepository;
import org.example.ims_backend.service.user.CommentService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CommentServiceImpl implements CommentService {
    CommentRepository commentRepository;

    @Override
    public List<CommentResponse> getComments(Task task) {
        List<Comment> comments = commentRepository.findAllByTask(task);
        CommentManager managers = new CommentManager();
        for(Comment comment : comments){
            Long parentCommentId = null;
            String []code = comment.getCommentCode().split("\\.");
            if(code.length >= 2){
                try{
                    parentCommentId = Long.parseLong(code[code.length - 2]);
                } catch (NumberFormatException e){
                    log.error("Invalid parentCommentId in comment code: {}", comment.getCommentCode(), e);
                }
            }
            managers.addComment(comment.getId(),
                    comment.getCreatedUser().getId(),
                    comment.getCreatedUser().getUsername(),
                    parentCommentId,
                    comment.getContent(),
                    comment.getCreatedDate());
        }
        return managers.getComments();
    }

    @Override
    public boolean deleteComment(Task task) {
        try {
            commentRepository.deleteAllByTask(task);
            return true;
        } catch (Exception e){
            log.error("Error in deleteComment", e);
            return false;
        }
    }
}
