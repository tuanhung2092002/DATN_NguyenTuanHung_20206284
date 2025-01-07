package org.example.ims_backend.common;

import org.example.ims_backend.dto.user.comment.response.CommentResponse;
import org.example.ims_backend.dto.user.menu.response.MenuResponse;

import java.time.LocalDate;
import java.util.*;

public class CommentManager {
    private Map<Long, CommentResponse> commentMap = new HashMap<>();
    private Map<Long,CommentResponse> resultMap = new HashMap<>();
    public void addComment(Long comment_id, Long create_user_id, String create_user_name, Long parent_comment_id, String content, Date created_date){
        if(commentMap.containsKey(comment_id)){
            return;
        }
        CommentResponse parent_comment = null;
        if (parent_comment_id != null) {
            parent_comment = commentMap.get(parent_comment_id);
            if (parent_comment == null) {
                return;
            }
        }

        CommentResponse newComment = new CommentResponse(comment_id,created_date,content,parent_comment_id,create_user_name,create_user_id);
        commentMap.put(comment_id,newComment);
        if (parent_comment != null) {
            parent_comment.addChildCommentResponse(newComment);

        }else{
            resultMap.put(comment_id,newComment);
        }

    }
    public List<CommentResponse> getComments() {
        return new ArrayList<>(resultMap.values());
    }
}
