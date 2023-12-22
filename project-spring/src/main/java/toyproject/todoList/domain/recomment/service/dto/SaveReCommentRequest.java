package toyproject.todoList.domain.recomment.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaveReCommentRequest {
    private Integer commentId;
    private String content;
}

