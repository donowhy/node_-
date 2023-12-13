package toyproject.todoList.domain.tag;

import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByPost(Post post);
}
