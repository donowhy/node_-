package toyproject.todoList.domain.chat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Entity
@Getter
@NoArgsConstructor
public class ChatDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer roomIdx;

    private String senderName;

    private String msg;

    private final String createdAt = LocalDateTime.now().format(
            DateTimeFormatter.ofPattern("MM월 dd일 a hh:mm", Locale.KOREAN));

    @Builder
    public ChatDocument(Integer roomIdx, String senderName, String msg) {
        this.roomIdx = roomIdx;
        this.senderName = senderName;
        this.msg = msg;
    }
}