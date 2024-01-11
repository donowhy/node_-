package toyproject.todoList.domain.chat.entity;

import jakarta.persistence.*;
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

    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;

    private String senderName;

    private String msg;

    private final String createdAt = LocalDateTime.now().format(
            DateTimeFormatter.ofPattern("MM월 dd일 a hh:mm", Locale.KOREAN));

    @Builder
    public ChatDocument(Integer id, ChatRoom chatRoom, String senderName, String msg) {
        this.id = id;
        this.chatRoom = chatRoom;
        this.senderName = senderName;
        this.msg = msg;
    }
}