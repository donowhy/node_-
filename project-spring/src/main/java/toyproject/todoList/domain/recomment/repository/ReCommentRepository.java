package toyproject.todoList.domain.recomment.repository;

import toyproject.todoList.domain.recomment.entity.ReComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReCommentRepository extends JpaRepository<ReComment, Long> {
}
