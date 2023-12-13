package toyproject.todoList.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.comment.service.CommentService;
import toyproject.todoList.domain.comment.service.dto.SaveCommentRequest;
import toyproject.todoList.domain.comment.service.dto.UpdateCommentRequest;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;

import java.util.Objects;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comment/save")
    public void saveComment(SaveCommentRequest request, @MemberInfo MembersInfo membersInfo) {
        commentService.saveComment(request, membersInfo.getId());
    }

    @DeleteMapping("/comment/delete")
    public void deleteComment(Long commentId, @MemberInfo MembersInfo membersInfo) {
        commentService.deleteComment(commentId, membersInfo.getId());

    }

    @PatchMapping("/comment/update")
    public void updateComment (UpdateCommentRequest request, @MemberInfo MembersInfo membersInfo){
        commentService.updateComment(request, membersInfo.getId());
    }
}
