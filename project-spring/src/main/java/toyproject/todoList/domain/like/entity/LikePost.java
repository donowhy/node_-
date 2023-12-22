package toyproject.todoList.domain.like.entity;

import lombok.Builder;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class LikePost extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @Builder
    public LikePost(Integer id, Member member, Post post) {
        this.id = id;
        this.member = member;
        this.post = post;
    }
}
