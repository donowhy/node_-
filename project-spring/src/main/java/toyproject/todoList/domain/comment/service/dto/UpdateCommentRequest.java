package toyproject.todoList.domain.comment.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateCommentRequest {

    private Long commentId;

    private String content;
}
