package toyproject.todoList.global.jwt;


import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MembersInfo {

    private Integer id;
    private String username;
}
