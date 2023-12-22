package toyproject.todoList.domain.recomment.service;

import toyproject.todoList.domain.comment.entity.Comment;
import toyproject.todoList.domain.comment.repository.CommentRepository;
import toyproject.todoList.domain.comment.service.dto.SaveCommentRequest;
import toyproject.todoList.domain.comment.service.dto.UpdateCommentRequest;
import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.post.repository.PostRepository;
import toyproject.todoList.domain.recomment.entity.ReComment;
import toyproject.todoList.domain.recomment.repository.ReCommentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import toyproject.todoList.domain.recomment.service.dto.SaveReCommentRequest;
import toyproject.todoList.domain.recomment.service.dto.UpdateReCommentRequest;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReCommentService {

    private final ReCommentRepository reCommentRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public void saveReComment(SaveReCommentRequest request, Integer id) {
        Member member = memberRepository.findById(id).orElseThrow();

        reCommentRepository.save(ReComment.builder()
                        .comment(commentRepository.findById(request.getCommentId()).orElseThrow())
                        .member(member)
                        .content(request.getContent())
                        .build());
    }

    public void deleteReComment(Integer reCommentId, Integer memberId) {
        ReComment reComment = reCommentRepository.findById(reCommentId).orElseThrow();
        if (Objects.equals(reComment.getMember().getId(), memberId)) {
            reCommentRepository.delete(reComment);
        }
        else throw new IllegalArgumentException();
    }

    public void updateReComment (UpdateReCommentRequest request, Integer memberId){
        ReComment reComment = reCommentRepository.findById(request.getReCommentId()).orElseThrow();
        if (Objects.equals(reComment.getMember().getId(), memberId)) {
            reComment.setReComment(request.getContent());
        }
        else throw new IllegalArgumentException();
    }

}
