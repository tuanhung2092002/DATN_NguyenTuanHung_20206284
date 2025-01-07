package org.example.ims_backend.dto.user.comment.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponse {
    Long comment_id;
    Long create_user_id;
    String create_user_name;
    Long parent_comment_id;
    String content;
    Date created_date;
    List<CommentResponse> childComments = new ArrayList<>();

    public CommentResponse(Long comment_id, Date created_date, String content, Long parent_comment_id, String create_user_name, Long create_user_id) {
        this.comment_id = comment_id;
        this.created_date = created_date;
        this.content = content;
        this.parent_comment_id = parent_comment_id;
        this.create_user_name = create_user_name;
        this.create_user_id = create_user_id;
    }
    public  void addChildCommentResponse(CommentResponse childComment) {
        if (this.childComments == null) {
            this.childComments = new ArrayList<>();
        }
        // Avoid adding duplicates
        if (!this.childComments.contains(childComment)) {
            this.childComments.add(childComment);
        }
    }
}
