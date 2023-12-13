package toyproject.todoList.domain.post.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class GetOnePostResponse {
    private String title;
    private String content;
    private List<String> tags;
    private int likeCount;
    private int viewCount;
    private String author;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    @Builder
    public GetOnePostResponse(String title, String content, List<String> tags, int likeCount, int viewCount, String author, LocalDateTime createTime, LocalDateTime updateTime) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.author = author;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
