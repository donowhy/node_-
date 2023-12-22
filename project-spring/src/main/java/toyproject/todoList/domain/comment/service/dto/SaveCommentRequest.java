package toyproject.todoList.domain.comment.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaveCommentRequest {

    private Integer postId;

    private String content;
}
