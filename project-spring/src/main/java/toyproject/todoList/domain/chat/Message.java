package toyproject.todoList.domain.chat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
public class Message implements Serializable {
    private String author;
    private String content;
    private String timestamp;

    @Builder
    public Message(String author, String content, String timestamp) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }

    public void setTimestamp(String time){
        this.timestamp = time;
    }

    @Override
    public String toString() {
        return "Message{" +
                "author='" + author + '\'' +
                ", content='" + content + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
