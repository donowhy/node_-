package toyproject.todoList.domain.member.repository;

import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer>{

    Optional<Member> findByLoginId(String loginId);

    @Modifying
    @Query("update Member m set m.password = :password where m.email = :email")
    int updateMemberPassword(@Param("email") String email, @Param("password") String password);


    @Query("select count(*) " +
            "from Post p left join p.member m " +
            "where m.id = :id")
    int postsCounter (@Param("id") Integer id);

    @Query("select count(c) " +
            "from Post p " +
            "join p.comments c " +
            "where p.member.id = :id")
    int commentsCounter(@Param("id") Integer id);


    @Query("select p from Post p where p.member.id = :id")
    ArrayList<Post> findPosts(@Param("id") Integer id);

}
