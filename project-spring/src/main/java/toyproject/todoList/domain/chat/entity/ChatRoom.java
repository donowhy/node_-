package toyproject.todoList.domain.chat.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String roomId;

    @ElementCollection
    private Set<Integer> chatMember = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "chatRoom")
    private List<ChatDocument> chatting;

    // room Id를 통해 데이터 Builder 패턴
    @Builder
    public ChatRoom(String roomId) {
        this.roomId = roomId;
    }
}

