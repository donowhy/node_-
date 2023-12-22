package toyproject.todoList.domain.like.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import toyproject.todoList.domain.like.entity.LikePost;
import toyproject.todoList.domain.like.repository.LikePostRepository;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.post.repository.PostRepository;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class LikePostService {

    private final LikePostRepository likePostRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public void likePost(Integer id, Integer memberId){
        Member member = memberRepository.findById(memberId).orElseThrow();

        Post post = postRepository.findById(id).orElseThrow();
        LikePost build = LikePost.builder()
                .member(member)
                .post(post)
                .build();
        post.getLikes().add(build);

        likePostRepository.save(build);
    }

    public void deleteLike(Integer id, Integer memberId){
        Member member = memberRepository.findById(memberId).orElseThrow();
        Post post = postRepository.findById(id).orElseThrow();

        likePostRepository.delete(likePostRepository.findLikePostByPostAndMember(post, member));

    }
}
