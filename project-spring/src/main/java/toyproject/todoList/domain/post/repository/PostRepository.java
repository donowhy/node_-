package toyproject.todoList.domain.post.repository;

import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findAllByMember(Member member);

//    @Query("SELECT p" +
//            "FROM Post p " +
//            "WHERE p.id = :id")
//    GetOnePostResponse getOnePost(@Param("id") Long id);
}
