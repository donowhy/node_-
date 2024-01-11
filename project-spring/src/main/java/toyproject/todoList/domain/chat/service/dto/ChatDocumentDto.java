package toyproject.todoList.domain.chat.service.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatDocumentDto {
    private String roomID;
    private String sendername;
    private String msg;
    private String createAt;

}
