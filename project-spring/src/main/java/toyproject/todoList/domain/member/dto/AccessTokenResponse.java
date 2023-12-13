package toyproject.todoList.domain.member.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccessTokenResponse {

    private String accessToken;

    @Builder
    public AccessTokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}

