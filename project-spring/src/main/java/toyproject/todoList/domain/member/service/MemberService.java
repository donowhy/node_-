package toyproject.todoList.domain.member.service;

import toyproject.todoList.domain.member.dto.*;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.entity.enumType.Role;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.member.service.dto.MemberResponse;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.global.error.ErrorCode;
import toyproject.todoList.global.exception.BusinessException;
import toyproject.todoList.global.jwt.JwtProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    // 회원 가입
    public void save(UserSaveRequestDto userSaveRequestDto) {

        Member member = Member.builder()
                .email(userSaveRequestDto.getEmail())
                .password(userSaveRequestDto.getPassword())
                .nickname(userSaveRequestDto.getNickname())
                .loginId(userSaveRequestDto.getLoginId())
                .role(Role.USER)
                .openPrivacy(true)
                .build();

        memberRepository.save(member);
    }


    // 유저 정보 조회
    public UserResponse getMyInfo(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() ->
                new BusinessException(ErrorCode.NOT_EXISTS_USER_ID)
        );

        ArrayList<MemberResponse.PostDto> postDtos = new ArrayList<>();
        List<Post> posts = memberRepository.findPosts(member.getId());
        for (Post post : posts) {
            postDtos.add(MemberResponse.PostDto.builder()
                    .title(post.getTitle())
                    .likes(post.getLikes().size())
                    .views(post.getViews().size())
                    .build());
        }

        return UserResponse.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .loginId(member.getLoginId())
                .postsCount(memberRepository.postsCounter(member.getId()))
                .commentsCount(memberRepository.commentsCounter(member.getId()))
                .postDtoList(postDtos)
                .openPrivacy(member.getOpenPrivacy())
                .build();
    }

    // 로그인
    public LoginResponse login(LoginRequest loginRequest) {
        Member member = memberRepository.findByLoginId(loginRequest.getLoginId()).orElseThrow(() ->
                new BusinessException(ErrorCode.INVALID_USER_DATA)
        );

        if (!member.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException();
        }

        // 로그인 시 엑세스 토큰, 리프레시 토큰 발급
        String accessToken = jwtProvider.createAccessToken(member);
        String refreshToken = jwtProvider.createRefreshToken(member);

        member.setRefreshToken(refreshToken);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    // 닉네임 변경
    public UpdateUserResponseDto updateNickname(UpdateUserRequestDto updateUserRequestDto, Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() ->
                new BusinessException(ErrorCode.NOT_EXISTS_USER_ID)
        );

        member.setNickname(updateUserRequestDto.getNickName());
        log.info("nickname = {}", member.getNickname());
        return UpdateUserResponseDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .build();
    }

    // 유저 삭제
    public void deleteUser(Long id) {

        Member member = memberRepository.findById(id).orElseThrow(()
                -> new BusinessException(ErrorCode.NOT_EXISTS_USER_ID));

    }


    // 유저 accessToken 재발급
    public AccessTokenResponse getAccessToken(AccessTokenRequest request, Long id) {

        Member member = memberRepository.findById(id).orElseThrow(()
                -> new BusinessException(ErrorCode.NOT_EXISTS_USER_ID));

        if(!request.getRefreshToken().equals(member.getRefreshToken())) throw new BusinessException(ErrorCode.NOT_VALID_TOKEN);

        String accessToken = jwtProvider.createAccessToken(member);
        String refreshToken = jwtProvider.createRefreshToken(member);

        member.setRefreshToken(refreshToken);

        return AccessTokenResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    // 비밀번호 변경
    public void changeMyPassword(Long id, ChangeMyPasswordRequestDto requestDto) {
        Member member = memberRepository.findById(id).orElseThrow(() ->
                new BusinessException(ErrorCode.NOT_EXISTS_USER_ID)
        );
        // 현재 비밀번호와 다를 때 exception;
        if (!member.getPassword().equals(requestDto.getNowPassword())) {
            throw new BusinessException(ErrorCode.NO_PERMISSION);
        }

        // 바꿀 비밀번호를 체크했을 떄와 다를 때 exception;
        if (!requestDto.getPasswordOne().equals(requestDto.getPasswordTwo())) {
            throw new BusinessException(ErrorCode.NO_PERMISSION);
        }

        member.setUserPassword(requestDto.getPasswordOne());
    }

    // 공개여부 변경
    public void changePrivacy (Long id){
        Member member = memberRepository.findById(id).orElseThrow(() ->
                new BusinessException(ErrorCode.NOT_EXISTS_USER_ID)
        );

        member.setOpenPrivacy(!member.getOpenPrivacy());
    }

    // 회원 정보 조회
    public MemberResponse getMemberInfo(Long myId, Long memberId) throws Exception {
        Member member = memberRepository.findById(myId).orElseThrow(() ->
                new BusinessException(ErrorCode.NOT_EXISTS_USER_ID)
        );

        Member findMember = memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessException(ErrorCode.NOT_EXISTS_USER_ID)
        );

        ArrayList<MemberResponse.PostDto> postDtos = new ArrayList<>();
        List<Post> posts = memberRepository.findPosts(findMember.getId());
        for (Post post : posts) {
            postDtos.add(MemberResponse.PostDto.builder()
                            .title(post.getTitle())
                            .likes(post.getLikes().size())
                            .views(post.getViews().size())
                    .build());
        }



        if (findMember.getOpenPrivacy()) {
            return MemberResponse.builder()
                    .nickname(findMember.getNickname())
                    .postsCount(memberRepository.postsCounter(findMember.getId()))
                    .commentsCount(memberRepository.commentsCounter(findMember.getId()))
                    .postDtoList(postDtos)
                    .build();
        } else {
            throw new BusinessException(ErrorCode.INVALID_DATA_TYPE);
        }


//                            .stream()
//                            .map(post -> MemberResponse.PostDto.builder()
//                                    .title(post.getTitle())
//                                    .likes(post.getLikes().size())
//                                    .views(post.getViews().size())
//                                    .build())
//                            .collect(Collectors.toList()))
    }
}
