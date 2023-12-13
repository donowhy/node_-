package toyproject.todoList.domain.post.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class SaveRequest {

    private String title;
    private String content;
    private List<String> tages;
}
