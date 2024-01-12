package toyproject.todoList.domain.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import toyproject.todoList.domain.member.dto.*;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.service.MemberService;
import toyproject.todoList.domain.member.service.dto.MemberResponse;
import toyproject.todoList.global.jwt.JwtProvider;

import java.util.ArrayList;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
class MemberControllerTest {

    private MockMvc mockMvc;

    @Mock
    private MemberService memberService;

    @InjectMocks
    private MemberController memberController;

    @Mock
    private JwtProvider jwtProvider;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(memberController).build();
    }

    @Test
    @DisplayName("회원 가입 테스트")
    void save() throws Exception {
        // Given
        RegisterDto registerDto = registerDto();

        // When & Then
        mockMvc.perform(post("/api/member/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registerDto)))
                .andExpect(status().isOk());

        // 추가적으로, memberService의 register 메소드가 실제로 호출되었는지 검증
        verify(memberService).save(any(RegisterDto.class));
    }
    @Test
    @DisplayName("회원 가입 시 유효성 검사 테스트")
    void saveValidationTest() throws Exception {
        // Given
        RegisterDto registerDto = registerDto();
        registerDto.setEmail(""); // 이메일을 빈 값으로 설정하여 유효성 검사 실패를 유도합니다.

        // When & Then
        mockMvc.perform(post("/api/member/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(registerDto)))
                .andExpect(status().isBadRequest());
    }

    private RegisterDto registerDto() {
        return RegisterDto.builder()
                .email("test01@test.com")
                .loginId("testId01")
                .password("test")
                .nickname("testing")
                .build();
    }

    @Test
    void login() throws Exception {
        // given
        LoginRequest loginRequest = loginRequest();

        // when
        when(memberService.login(any(LoginRequest.class)))
                .thenReturn(new LoginResponse("mocked-token"));

        // then
        mockMvc.perform(post("/api/member/signin")
                .content(new Gson().toJson(loginRequest))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andDo(print());

    }

    private LoginRequest loginRequest() {
        return LoginRequest.builder()
                .loginId("testId01")
                .password("test")
                .build();
    }

    @Test
    @DisplayName("다른 사람 정보 조회")
    public void getMemberInfoTest() throws Exception {

        Member member = Member.builder()
                .id(2)
                .email("test2@naver.com")
                .nickname("test2")
                .loginId("test2")
                .password("test2Test2")
                .openPrivacy(true)
                .build();

        MemberResponse expectedResponse = MemberResponse.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .postsCount(10)
                .commentsCount(5)
                .postDtoList(Collections.emptyList())
                .likes(100)
                .build();

        // memberService.getMemberInfo 메서드 스텁 설정
        Mockito.when(memberService.getMemberInfo(null, 2))
                .thenReturn(expectedResponse);

        // then
        mockMvc.perform(get("/api/member/info/{id}", 2)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)) // 기대되는 응답 타입을 지정

                .andDo(print()) // 요청과 응답의 디테일을 출력
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test2@naver.com")); // 받아온 response가 예상한 값과 일치하는지 검증
    }

    
    @Test
    void getMyInfo() throws Exception {
        //given
        Member member = Member.builder()
                .id(1)
                .email("test1@naver.com")
                .nickname("test1")
                .loginId("test1")
                .password("test1Test2")
                .openPrivacy(true)
                .build();

        MemberInfoDto expectedResponse = MemberInfoDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .loginId(member.getLoginId())
                .postsCount(10)
                .commentsCount(5)
                .postDtoList(Collections.emptyList())
                .openPrivacy(member.getOpenPrivacy())
                .build();

        Mockito.when(memberService.getMyInfo(null))
                .thenReturn(expectedResponse);

        // then
        mockMvc.perform(get("/api/member/info/self")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)) // 기대되는 응답 타입을 지정

                .andDo(print()) // 요청과 응답의 디테일을 출력
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test1@naver.com"))
                .andExpect(jsonPath("$.nickname").value("test1"))
                .andExpect(jsonPath("$.loginId").value("test1"))
                .andExpect(jsonPath("$.postDtoList").value(new ArrayList<MemberInfoDto.PostDto>()))
                .andExpect(jsonPath("$.openPrivacy").value(true)); // 받아온 response가 예상한 값과 일치하는지 검증
    }

    @Test
    void updateNickname() throws Exception {
        //given
        Member member = Member.builder()
                .id(1)
                .email("test1@naver.com")
                .nickname("test1")
                .loginId("test1")
                .password("test1Test2")
                .openPrivacy(true)
                .build();

        UpdateUserRequestDto request = UpdateUserRequestDto.builder()
                .nickName("test02")
                .build();

        UpdateUserResponseDto response = UpdateUserResponseDto.builder()
                .nickname("test02")
                .email(member.getEmail())
                .build();

        doReturn(response).when(memberService)
                .updateNickname(any(UpdateUserRequestDto.class), eq(null));

        ResultActions resultActions = mockMvc.perform(put("/api/member/change/nickname")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(new Gson().toJson(request)));

        resultActions
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value("test02"))
                .andExpect(jsonPath("$.email").value("test1@naver.com"));
    }

    @Test
    void delete() {
    }

    @Test
    void changeMyPassword() {
    }

    @Test
    void changePrivacy() {
    }
}