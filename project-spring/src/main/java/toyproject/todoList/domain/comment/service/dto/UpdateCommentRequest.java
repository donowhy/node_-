package toyproject.todoList.domain.comment.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateCommentRequest {

    private Integer commentId;

    private String content;
}
