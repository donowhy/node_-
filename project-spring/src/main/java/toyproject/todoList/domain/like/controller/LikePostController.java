package toyproject.todoList.domain.like.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import toyproject.todoList.domain.like.service.LikePostService;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikePostController {
    private final LikePostService likePostService;


    @PostMapping("/{id}")
    public void likePost(@PathVariable("id") Long id, @MemberInfo MembersInfo membersInfo) {
        likePostService.likePost(id, membersInfo.getId());
    }

    @DeleteMapping("/{id}")
    public void deleteLike(@PathVariable("id") Long id, @MemberInfo MembersInfo membersInfo) {
        likePostService.deleteLike(id, membersInfo.getId());
    }
}
