package toyproject.todoList.domain.chat.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatResponse {
    private List<ChatRequest> contents;
    private Integer currentPage;
    private Integer totalPage;

}
