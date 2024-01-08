package toyproject.todoList.domain.chat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ChatDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private Long roomIdx;

    private String senderName;

    private String msg;

    private final String createdAt = String.valueOf(LocalDateTime.now());

    @Builder
    public ChatDocument(Long roomIdx, String senderName, String msg, String createdAt) {
        this.roomIdx = roomIdx;
        this.senderName = senderName;
        this.msg = msg;
    }
}