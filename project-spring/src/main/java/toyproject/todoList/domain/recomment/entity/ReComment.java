package toyproject.todoList.domain.recomment.entity;

import lombok.Builder;
import toyproject.todoList.domain.comment.entity.Comment;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor
public class ReComment extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne(fetch = LAZY)
    private Comment comment;

    @ManyToOne(fetch = LAZY)
    private Member member;

    private String content;

    @Builder
    public ReComment(Integer id, Comment comment, Member member, String content) {
        this.id = id;
        this.comment = comment;
        this.member = member;
        this.content = content;
    }

    public void setReComment(String content) {
        this.content = content;
    }
}
