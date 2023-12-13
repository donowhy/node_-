package toyproject.todoList.domain.post.repository;

import toyproject.todoList.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

//    @Query("SELECT p" +
//            "FROM Post p " +
//            "WHERE p.id = :id")
//    GetOnePostResponse getOnePost(@Param("id") Long id);
}
