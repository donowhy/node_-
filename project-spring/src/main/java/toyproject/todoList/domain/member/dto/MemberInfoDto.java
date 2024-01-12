package toyproject.todoList.domain.member.dto;

import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.service.dto.MemberResponse;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class MemberInfoDto {

    private String email;
    private String nickname;
    private String loginId;
    private int postsCount;
    private int commentsCount;
    private List<MemberResponse.PostDto> postDtoList;
    private Boolean openPrivacy;

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDto {
        private String title;
        private int likes;
        private int views;
    }

    public static MemberInfoDto from(Member member) {
        return MemberInfoDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .loginId(member.getLoginId())
                .postsCount(member.getPostList().size())
                .commentsCount(member.getComments().size())
                .postDtoList(member.getPostList().stream()
                        .map(post -> MemberResponse.PostDto.builder()
                                .title(post.getTitle())
                                .likes(post.getLikes().size())
                                .views(post.getViews())
                                .build())
                        .collect(Collectors.toList()))
                .openPrivacy(member.getOpenPrivacy())
                .build();
    }
}
