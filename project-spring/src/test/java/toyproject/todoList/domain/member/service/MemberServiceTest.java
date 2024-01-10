package toyproject.todoList.domain.member.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Repository;
import org.springframework.test.annotation.Rollback;
import toyproject.todoList.domain.member.dto.MemberInfo;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.member.service.dto.MemberResponse;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.post.repository.PostRepository;
import toyproject.todoList.global.jwt.JwtProvider;

import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@SpringBootTest

class MemberServiceTest {

    @Autowired
    public MemberRepository memberRepository;

    @Autowired
    public PostRepository postRepository;

    @Test
    @Rollback
    void save() {
        Member member = Member.builder()
                .email("test0123@naver.com")
                .loginId("test01")
                .nickname("testname")
                .password("test01test")
                .build();

        Member save = memberRepository.save(member);

        assertThat(save).isNotNull();
        assertThat(save.getId()).isGreaterThan(0);
    }

    @Test
    @Rollback
    void getMyInfo() {
        // Mock 객체 생성
        MemberRepository memberRepository = mock(MemberRepository.class);
        JwtProvider jwtProvider = mock(JwtProvider.class);
        MemberService memberService = new MemberService(memberRepository, jwtProvider);

        // 테스트 데이터 생성
        Member member = Member.builder()
                .email("test01234@naver.com")
                .loginId("test012")
                .nickname("testname1")
                .password("test01test1")
                .build();

        Post post = Post.builder()
                .title("test title")
                .views(100)
                .member(member)
                .build();

        // Mock 객체의 메서드가 호출될 때의 반환값 조작
        when(memberRepository.findById(any())).thenReturn(Optional.of(member));
        when(postRepository.findAllByMember(any())).thenReturn(Collections.singletonList(post));

        // getMyInfo() 메서드 호출
        MemberInfo memberInfo = memberService.getMyInfo(member.getId());

        // 반환된 MemberInfo 객체 검증
        assertThat(memberInfo.getEmail()).isEqualTo(member.getEmail());
        assertThat(memberInfo.getNickname()).isEqualTo(member.getNickname());
        assertThat(memberInfo.getLoginId()).isEqualTo(member.getLoginId());
        assertThat(memberInfo.getPostsCount()).isEqualTo(1); // 위에서 하나의 Post를 생성했으므로
        assertThat(memberInfo.getCommentsCount()).isEqualTo(0); // Comment는 생성하지 않았으므로

        // PostDtoList의 첫 번째 요소를 검증합니다.
        MemberResponse.PostDto postDto = memberInfo.getPostDtoList().get(0);
        assertThat(postDto.getTitle()).isEqualTo(post.getTitle());
        assertThat(postDto.getLikes()).isEqualTo(0); // Like는 생성하지 않았으므로
        assertThat(postDto.getViews()).isEqualTo(post.getViews());

        // openPrivacy는 기본값에 따라 검증합니다.
        assertThat(memberInfo.getOpenPrivacy()).isEqualTo(member.getOpenPrivacy());
    }

    @Test
    void login() {
    }

    @Test
    void updateNickname() {
    }

    @Test
    void deleteUser() {
    }

    @Test
    void getAccessToken() {
    }

    @Test
    void changeMyPassword() {
    }

    @Test
    void changePrivacy() {
    }

    @Test
    void getMemberInfo() {
    }
}