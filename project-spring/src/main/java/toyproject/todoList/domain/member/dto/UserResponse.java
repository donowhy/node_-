package toyproject.todoList.domain.member.dto;


import toyproject.todoList.domain.member.service.dto.MemberResponse;
import lombok.*;

import java.util.List;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private String email;

    private String nickname;
    private String loginId;
    private int postsCount;
    private int commentsCount;
    private List<MemberResponse.PostDto> postDtoList;
    private String profileUrl;
    private Boolean openPrivacy;


    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    static class PostDto{
        private String title;
        private int likes;
        private int views;
    }
}



