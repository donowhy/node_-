package toyproject.todoList.domain.comment.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import toyproject.todoList.domain.comment.entity.Comment;
import toyproject.todoList.domain.comment.repository.CommentRepository;
import toyproject.todoList.domain.comment.service.dto.SaveCommentRequest;
import toyproject.todoList.domain.comment.service.dto.UpdateCommentRequest;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.post.repository.PostRepository;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public void saveComment(SaveCommentRequest request, Long id) {
        Member member = memberRepository.findById(id).orElseThrow();
        Post post = postRepository.findById(request.getPostId()).orElseThrow();
        commentRepository.save(Comment.builder()
                .post(post)
                .member(member)
                .content(request.getContent())
                .build());
    }

    public void deleteComment(Long commentId, Long memberId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        if (Objects.equals(comment.getMember().getId(), memberId)) {
            commentRepository.delete(comment);
        }
        else throw new IllegalArgumentException();
    }

    public void updateComment (UpdateCommentRequest request, Long memberId){
        Comment comment = commentRepository.findById(request.getCommentId()).orElseThrow();
        if (Objects.equals(comment.getMember().getId(), memberId)) {
            comment.setCommnet(request.getContent());
        }
        else throw new IllegalArgumentException();
    }
}
