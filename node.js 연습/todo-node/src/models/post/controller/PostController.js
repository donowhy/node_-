import { Router } from "express";
import { PostService } from "../service/PostService";
import { CreatePostDto } from "../dto/CreatePostDto";
import { UpdatePostDto } from "../dto/UpdatePostDto";
import { pagination } from "../../../middleware/pagination";
import { jwtAuth, log } from "../../../middleware";
import { PostCommentService } from "../service/PostCommentService";
import { CreateCommentDto } from "../dto/commentDto/CreateCommentDto";
import { PostReCommentService } from "../service/PostReCommentService";

class PostController {
    router;
    path = "/posts";
    postService;
    postCommentService;
    postReCommentService;
    authRequired = true;

    constructor() {
        this.router = new Router();
        this.postService = new PostService();
        this.postCommentService = new PostCommentService();
        this.postReCommentService = new PostReCommentService();
        this.init();
    }

    init() {
        this.router.post("/", this.createPost.bind(this));
        this.router.get("/:id", this.getPost.bind(this));
        this.router.get("/", pagination, this.getPosts.bind(this));
        this.router.delete("/:id", this.deletePost.bind(this));
        this.router.patch("/:id", this.updatePost.bind(this));

        this.router.post("/:id", this.createComment.bind(this));
        this.router.get("/:id/comments", this.getComments.bind(this));
        this.router.patch(
            "/:id/comments/:commentId",
            this.updateComment.bind(this)
        );
        this.router.delete(
            "/:id/comments/:commentId",
            this.deleteComment.bind(this)
        );

        this.router.post(
            "/:id/comments/:commentId/recomments",
            this.createReComment.bind(this)
        );

        this.router.patch(
            "/:id/comments/:commentId/recomments/:re_commentId",
            this.updateReComment.bind(this)
        );
        this.router.delete(
            "/:id/comments/:commentId/recomments/:re_commentId",
            this.deleteReComment.bind(this)
        );
    }

    async createPost(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };
            const body = req.body;

            const newPostId = await this.postService.savePost({
                title: body.title,
                content: body.content,
                tag: body.tag,
                id: req.member.id,
            });

            res.status(201).json({ id: newPostId });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getPost(req, res, next) {
        try {
            const { id } = req.params;
            const postId = parseInt(id, 10);

            const post = await this.postService.getPost(postId, req.member);

            res.status(200).json({ post });
        } catch (err) {
            next(err);
        }
    }

    async getPosts(req, res, next) {
        try {
            const searchValue = req.query.searchValue;
            const { posts, count } = await this.postService.getPosts(
                {
                    skip: req.skip,
                    take: req.take,
                },
                searchValue
            );

            res.status(200).json({ posts, count });
        } catch (err) {
            next(err);
        }
    }
    async deletePost(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요" };
            const { id } = req.params;
            const postId = parseInt(id, 10);
            await this.postService.deletePost(postId, req.member);

            res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };

            const { id } = req.params;
            const postId = parseInt(id, 10);
            const body = req.body;

            await this.postService.updatePost(
                postId,
                new UpdatePostDto(body),
                req.member
            );

            res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }

    // 게시글 댓글
    async createComment(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요" };

            const { id } = req.params;
            const postId = parseInt(id, 10);
            const body = req.body;

            const newCommentId = await this.postCommentService.createComment(
                postId,
                new CreateCommentDto({
                    content: body.content,
                    member_id: body.member_id,
                })
            );

            res.status(201).json({
                id: newCommentId,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    // PostController
    async getComments(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }
            const { id } = req.params;
            const post_id = parseInt(id, 10);
            console.log("controller", post_id);
            const { comments, count } =
                await this.postCommentService.getComments(post_id);
            return res.status(200).json({ comments, count });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async updateComment(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }

            const { id } = req.params;
            const postId = parseInt(id, 10);

            const { commentId } = req.params;
            const commnet_id = parseInt(commentId, 10);

            const body = req.body;
            const contents = await this.postCommentService.updateComment(
                postId,
                commnet_id,
                body,
                req.member
            );

            console.log(contents);

            res.status(204).json({
                contents, // 왜 201 create 나오는데 content의 값이 안나오는건가.
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async deleteComment(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }

            const { id } = req.params;
            const postId = parseInt(id, 10);

            const { commentId } = req.params;
            const commnet_id = parseInt(commentId, 10);
            await this.postCommentService.deleteComment(
                postId,
                commnet_id,
                req.member
            );

            res.status(204).json({});
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async createReComment(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }

            const { commentId } = req.params;
            const commnet_id = parseInt(commentId, 10);
            const body = req.body;
            console.log(body);
            const newReComment =
                await this.postReCommentService.CreateReComment(
                    commnet_id,
                    body
                );
            res.status(201).json(newReComment.id);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async updateReComment(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }

            const { commentId } = req.params;
            const commnet_id = parseInt(commentId, 10);
            console.log(commnet_id);

            const { re_commentId } = req.params;
            const re_commnet_id = parseInt(re_commentId, 10);

            const body = req.body;
            console.log(body);
            const contents = await this.postReCommentService.updateReComment(
                commnet_id,
                re_commnet_id,
                body
            );

            res.status(204).json({
                contents,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async deleteReComment(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }

            const { commentId } = req.params;
            const commnet_id = parseInt(commentId, 10);

            const { re_commentId } = req.params;
            const re_commnet_id = parseInt(re_commentId, 10);

            await this.postReCommentService.deleteReComment(
                commnet_id,
                re_commnet_id,
                req.member
            );

            res.status(204).json({});
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}
const postController = new PostController();
export default postController;
