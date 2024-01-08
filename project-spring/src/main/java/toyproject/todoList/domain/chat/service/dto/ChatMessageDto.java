package toyproject.todoList.domain.chat.service.dto;


import lombok.Data;

@Data
public class ChatMessageDto {
    private Integer roomidx;
    private String email;
    private String message;
}

