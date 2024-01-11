package toyproject.todoList.domain.chat.service.dto;

import lombok.*;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class ChatRequest {

    private String roomId;
    private String sender;
    private String msg;
    private String time;
}
