package toyproject.todoList.domain.recomment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.recomment.service.ReCommentService;
import toyproject.todoList.domain.recomment.service.dto.SaveReCommentRequest;
import toyproject.todoList.domain.recomment.service.dto.UpdateReCommentRequest;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;

import java.util.Objects;

@RequiredArgsConstructor
@RequestMapping("/api/post")
@RestController
public class ReCommentController {

    private final ReCommentService reCommentService;
    @PostMapping("/re-comment")
    public void saveReComment(SaveReCommentRequest request, @MemberInfo MembersInfo membersInfo) {
        reCommentService.saveReComment(request, membersInfo.getId());
    }

    @DeleteMapping("/re-comment")
    public void deleteReComment(Long reCommentId, @MemberInfo MembersInfo membersInfo) {
        reCommentService.deleteReComment(reCommentId,membersInfo.getId());
    }

    @PatchMapping("/re-comment")
    public void updateReComment (UpdateReCommentRequest request, @MemberInfo MembersInfo membersInfo){
        reCommentService.updateReComment(request,membersInfo.getId());
    }
}
