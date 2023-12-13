package toyproject.todoList.domain.member.service.dto;


import lombok.*;

import java.util.List;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponse {

    private String email;

    private String nickname;
    private int postsCount;
    private int commentsCount;
    private List<MemberResponse.PostDto> postDtoList;
    private int likes;
    private String profileUrl;


    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Builder
    public static class PostDto{
        private String title;
        private int likes;
        private int views;
    }
}