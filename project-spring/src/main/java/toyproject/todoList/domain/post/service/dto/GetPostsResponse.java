package toyproject.todoList.domain.post.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetPostsResponse {
    private String title;
    private Integer views;
    private String author;
    private LocalDate localDate;
    private Integer likes;


}
