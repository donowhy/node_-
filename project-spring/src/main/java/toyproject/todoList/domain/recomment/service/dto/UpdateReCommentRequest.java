package toyproject.todoList.domain.recomment.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateReCommentRequest {
    private Long reCommentId;
    private String content;

}
