package toyproject.todoList.domain.member.dto;

import lombok.Getter;

@Getter
public class AccessTokenRequest {
    private String refreshToken;
}

