package toyproject.todoList.domain.post.entity;

import toyproject.todoList.domain.comment.entity.Comment;
import toyproject.todoList.domain.like.entity.LikePost;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.tag.entity.Tag;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String content;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    private Integer views;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<LikePost> likes;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Tag> tags;


    @Builder
    public Post(Integer id, String title, String content, List<Comment> comments, Member member, Integer views, List<LikePost> likes, List<Tag> tags) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.comments = comments;
        this.member = member;
        this.views = views;
        this.likes = likes;
        this.tags = tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public void updateTitleAndContentAndTags(String title, String content, List<Tag> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

}
