package toyproject.todoList.domain.post.controller;

import toyproject.todoList.domain.post.service.PostService;
import toyproject.todoList.domain.post.service.dto.*;
import toyproject.todoList.global.jwt.MemberInfo;
import toyproject.todoList.global.jwt.MembersInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/save")
    public SaveResponse savePost(@RequestBody SaveRequest request, @MemberInfo MembersInfo membersInfo) {
        return postService.savePost(request, membersInfo.getId());
    }

    @PatchMapping("/update")
    public SaveResponse updatePost(@RequestBody UpdateRequest request, @MemberInfo MembersInfo membersInfo) {
        return postService.updatePost(request, membersInfo.getId());
    }

    @GetMapping("")
    public List<GetPostsResponse> getWholePosts () {
        return postService.getWholePosts();
    }

    @GetMapping("/{id}")
    public GetOnePostResponse getOnePost (@PathVariable("id") Integer id, @MemberInfo(required = false) MembersInfo memberInfo) {
        return postService.getOnePost(id, memberInfo.getId());
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable("id") Integer id, @MemberInfo MembersInfo membersInfo){
        postService.deletePost(id, membersInfo.getId());
    }
}
