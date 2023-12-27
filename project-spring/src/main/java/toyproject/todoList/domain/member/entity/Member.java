package toyproject.todoList.domain.member.entity;

import lombok.Getter;
import toyproject.todoList.domain.comment.entity.Comment;
import toyproject.todoList.domain.member.entity.enumType.Role;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.recomment.entity.ReComment;
import toyproject.todoList.domain.todo.entity.TodoList;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    private String password;

    @Column(length = 30, unique=true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    @NotBlank
    private String nickname;

    private String refreshToken;

    @NotBlank
    private Boolean openPrivacy;

    @NotBlank
    private String loginId;

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<TodoList> todoList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    private List<Post> postList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = ALL)
    private List<ReComment> reComments = new ArrayList<>();

    @Builder
    public Member(String password, String email,  String nickname, String refreshToken, Boolean openPrivacy, String loginId) {
        this.password = password;
        this.email = email;
        this.role = Role.USER;
        this.nickname = nickname;
        this.refreshToken = refreshToken;
        this.openPrivacy = openPrivacy;
        this.loginId = loginId;
    }

    public void setNickname(String nickName) {
        this.nickname = nickName;
    }

    public void setUserPassword(String pw) {
        this.password = pw;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setOpenPrivacy(Boolean openPrivacy) {
        this.openPrivacy = openPrivacy;
    }

}
