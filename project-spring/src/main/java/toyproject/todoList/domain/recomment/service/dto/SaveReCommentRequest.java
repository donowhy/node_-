package toyproject.todoList.domain.recomment.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SaveReCommentRequest {
    private Long commentId;
    private String content;
}

