package org.example.ims_backend.service.user;

import org.example.ims_backend.dto.user.comment.response.CommentResponse;
import org.example.ims_backend.entity.Task;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getComments(Task task);
    boolean deleteComment(Task task);
}
