package toyproject.todoList.domain.like.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import toyproject.todoList.domain.like.entity.LikePost;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.post.entity.Post;

public interface LikePostRepository extends JpaRepository<LikePost, Long> {

    LikePost findLikePostByPostAndMember(Post post, Member member);
}
