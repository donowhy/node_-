package toyproject.todoList.domain.member.controller;

import toyproject.todoList.domain.member.dto.*;
import toyproject.todoList.domain.member.service.MemberService;
import toyproject.todoList.domain.member.service.dto.MemberResponse;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;


    @Operation(summary = "회원가입", description = "회원가입 시 이메일, 패스워드, 내가 가지고 있는 cardlist를 request로 받는다", tags = { "Member Controller" })
    @PostMapping("/signup")
    public void save(@RequestBody @Valid UserSaveRequestDto userSaveRequestDto){
        memberService.save(userSaveRequestDto);
    }


    @Operation(summary = "로그인", description = "로그인 시 토큰 발급", tags = { "Member Controller" })
    @PostMapping("/signin")
    public LoginResponse login (@RequestBody LoginRequest loginRequest) {
        return memberService.login(loginRequest);
    }



    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "나의 정보 조회", description = "나의 정보 조회, 토큰만 넣으면 됨.", tags = { "Member Controller" })
    @GetMapping("/info/{id}")
    public MemberResponse getMemberInfo (@MemberInfo MembersInfo membersInfo, @PathVariable("id") Integer id) throws Exception {
        return memberService.getMemberInfo(membersInfo.getId(), id);
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "멤버 정보", description = "멤버 정보 불러오기", tags = { "Member Controller" })
    @GetMapping("/info/self")
    public UserResponse getMyInfo (@MemberInfo MembersInfo membersInfo) {
        return memberService.getMyInfo(membersInfo.getId());
    }



    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "닉네임 변경", description = "서비스 내 나의 닉네임 변경", tags = { "Member Controller" })
    @PutMapping("/change/nickname")
    public UpdateUserResponseDto updateNickname (@MemberInfo MembersInfo membersInfo, @RequestBody UpdateUserRequestDto updateUserRequestDto){
        return memberService.updateNickname(updateUserRequestDto, membersInfo.getId());
    }


    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "멤버 삭제", description = "멤버 정보 삭제", tags = { "Member Controller" })
    @DeleteMapping("/resign")
    public void delete (@MemberInfo MembersInfo membersInfo){
        memberService.deleteUser(membersInfo.getId());
    }



//    @Operation(summary = "토큰 재발급", description = "refreshToken이 있을 때 AccessToken 재발급한다", tags = { "Member Controller" })
//    @PostMapping("/token")
//    public AccessTokenResponse getAccessToken (@RequestBody AccessTokenRequest request, Header){
//        return memberService.getAccessToken(request, membersInfo.getId());
//    }



    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "비밀번호 변경", description = "현재 비밀번호를 입력후 1, 2차 확인 후 변경할 비밀번호로 바꾼다 ", tags = { "Member Controller" })
    @PutMapping("/change/pw")
    public void changeMyPassword (@MemberInfo MembersInfo membersInfo,@RequestBody ChangeMyPasswordRequestDto requestDto){
        memberService.changeMyPassword(membersInfo.getId(), requestDto);
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "공개 여부 변경", description = "클릭 시 boolean 값이 true -> false or false -> true 가 된다.", tags = { "Member Controller" })
    @PutMapping("/change/privacy")
    public void changePrivacy(@MemberInfo MembersInfo membersInfo){
        memberService.changePrivacy(membersInfo.getId());
    }

}
