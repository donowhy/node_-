package toyproject.todoList.domain.post.service;

import toyproject.todoList.domain.member.entity.Member;
import toyproject.todoList.domain.member.repository.MemberRepository;
import toyproject.todoList.domain.post.entity.Post;
import toyproject.todoList.domain.post.repository.PostRepository;
import toyproject.todoList.domain.post.service.dto.*;
import toyproject.todoList.domain.tag.TagRepository;
import toyproject.todoList.domain.tag.entity.Tag;
import toyproject.todoList.global.error.ErrorCode;
import toyproject.todoList.global.exception.BusinessException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    public SaveResponse savePost(SaveRequest request, Long id) {

        Member member = memberRepository.findById(id).orElseThrow();

        Post build = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .member(member)
                .build();

        List<Tag> tags = request.getTages()
                .stream()
                .map(tagName -> Tag.builder()
                        .name(tagName)
                        .post(build)
                        .build()
                )
                .toList();

        postRepository.save(build);
        tagRepository.saveAll(tags);

        return SaveResponse.builder()
                .title(build.getTitle())
                .content(build.getContent())
                .tags(request.getTages())
                .build();
    }

    public SaveResponse updatePost (UpdateRequest request, Long id) {

        Member member = memberRepository.findById(id).orElseThrow();
        List<Post> postList = member.getPostList();
        Post post = postRepository.findById(request.getPostId()).orElseThrow();
        if (!postList.contains(post)) {
            // 사용자의 게시물이 아님;
            throw new BusinessException(ErrorCode.FAIL_DELETE_FILE);
        }

        tagRepository.deleteAll(tagRepository.findByPost(post));
        ArrayList<Tag> tagArrayList = new ArrayList<>();
        for(int i=0; i<request.getTags().size(); i++) {
            Tag newTag = Tag.builder()
                    .post(post)
                    .name(request.getTags().get(i))
                    .build();
            tagArrayList.add(newTag);
            tagRepository.save(newTag);
        }
        post.updateTitleAndContentAndTags(request.getTitle(), request.getContent(), tagArrayList);

        return SaveResponse.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .tags(request.getTags())
                .build();
    }

    public List<GetPostsResponse> getWholePosts () {
        List<Post> all = postRepository.findAll();

        List<GetPostsResponse> posts = new ArrayList<>();
        for (Post post : all) {
            GetPostsResponse build = GetPostsResponse.builder()
                    .title(post.getTitle())
                    .views(post.getViews().size())
                    .likes(post.getLikes().size())
                    .author(post.getMember().getNickname())
                    .localDate(post.getUpdateTime().toLocalDate())
                    .build();
            posts.add(build);
        }
        return posts;
    }

    public GetOnePostResponse getOnePost (Long id, Long inMemberId) {
        ArrayList<String> temp = new ArrayList<>();
        Post post = postRepository.findById(id).orElseThrow();

        if(inMemberId != null) {
            post.setViews(inMemberId);
        }


        for(int i=0; i<post.getTags().size(); i++) {
            temp.add(post.getTags().get(i).getName());
        }
        return GetOnePostResponse.builder()
                .title(post.getTitle())
                .tags(temp)
                .viewCount(post.getViews().size())
                .likeCount(post.getLikes().size())
                .author(post.getMember().getNickname())
                .content(post.getContent())
                .createTime(post.getCreateTime())
                .updateTime(post.getUpdateTime())
                .build();
    }

    public void deletePost(Long id, Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow();

        Post post = postRepository.findById(id).orElseThrow();
        if(!Objects.equals(post.getMember().getId(), memberId)) {
            throw new IllegalArgumentException();
        }

        postRepository.delete(post);
    }
}
