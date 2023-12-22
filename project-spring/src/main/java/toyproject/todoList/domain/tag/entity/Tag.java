package toyproject.todoList.domain.tag.entity;

import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Tag extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public Tag(Integer id, String name, Post post) {
        this.id = id;
        this.name = name;
        this.post = post;
    }
}
