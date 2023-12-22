package toyproject.todoList.domain.member.entity;

import toyproject.todoList.domain.comment.entity.Comment;
import toyproject.todoList.domain.member.entity.enumType.Role;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.recomment.entity.ReComment;
import toyproject.todoList.domain.todo.entity.TodoList;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.*;

@Entity
@Getter
@NoArgsConstructor
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

    private String nickname;

    private String refreshToken;

    private Boolean openPrivacy;

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
    public Member(Integer id, String password, String email, Role role, String nickname, String refreshToken, Boolean openPrivacy, String loginId, List<TodoList> todoList, List<Post> postList, List<Comment> comments, List<ReComment> reComments) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.role = role;
        this.nickname = nickname;
        this.refreshToken = refreshToken;
        this.openPrivacy = openPrivacy;
        this.loginId = loginId;
        this.todoList = todoList;
        this.postList = postList;
        this.comments = comments;
        this.reComments = reComments;
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
