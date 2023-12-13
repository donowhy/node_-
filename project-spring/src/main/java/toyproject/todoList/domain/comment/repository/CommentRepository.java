package toyproject.todoList.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import toyproject.todoList.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
