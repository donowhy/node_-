package toyproject.todoList.domain.post.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class SaveResponse {

    private String title;
    private String content;
    private List<String> tags;

}
