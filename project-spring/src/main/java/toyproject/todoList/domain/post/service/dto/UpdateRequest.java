package toyproject.todoList.domain.post.service.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class UpdateRequest {

    private String title;
    private String content;
    private List<String> tags;
    private Long postId;
}
