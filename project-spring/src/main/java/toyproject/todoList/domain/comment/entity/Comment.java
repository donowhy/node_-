package toyproject.todoList.domain.comment.entity;

import lombok.Builder;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.recomment.entity.ReComment;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    private String content;

    @ManyToOne(fetch = LAZY)
    private Post post;

    @ManyToOne(fetch = LAZY)
    private Member member;

    @OneToMany(mappedBy = "comment", cascade = ALL)
    private List<ReComment> reCommentList;

    @Builder
    public Comment(Long id, String content, Post post, Member member, List<ReComment> reCommentList) {
        this.id = id;
        this.content = content;
        this.post = post;
        this.member = member;
        this.reCommentList = reCommentList;
    }

    public void setCommnet(String content) {
        this.content = content;
    }
}
