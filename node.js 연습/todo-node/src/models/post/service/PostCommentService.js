import database from "../../../database";
import { MemberService } from "../../users/service";

export class PostCommentService {
    memberService;
    constructor() {
        this.memberService = new MemberService();
    }

    async createComment(id, props) {
        const member = await this.memberService.findMemberById(props.member_id);

        const post = await database.post.findUnique({
            where: {
                id,
            },
        });
        console.log(member.id);
        if (!post) throw { status: 404, message: "게시글을 찾을 수 없음." };

        const newComment = await database.comment.create({
            data: {
                content: props.content,
                post: {
                    connect: {
                        id: post.id,
                    },
                },
                member: {
                    connect: {
                        id: member.id,
                    },
                },
                create_time: getCurrentTimeFormatted(),
                update_time: getCurrentTimeFormatted(),
            },
        });
        return newComment.id;
    }

    // PostCommentService
    async getComments(post_id) {
        const comments = await database.comment.findMany({
            where: {
                post_id: post_id,
            },
            include: {
                member: true,
            },
        });
        console.log("comments", comments);
        const count = await database.comment.count({
            where: {
                post_id,
            },
        });

        return {
            comments,
            count,
        };
    }

    async updateComment(post_id, comment_id, props, member) {
        const comment = await database.comment.findUnique({
            where: {
                id: comment_id,
            },
        });

        const post = await database.post.findUnique({
            where: {
                id: post_id,
            },
        });

        if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };
        if (!comment)
            throw { status: 404, message: "댓글을 찾을 수 없습니다." };

        if (post.member_id !== member.id && comment.member_id !== member.id)
            throw { status: 403, message: "본인글만 수정이 가능합니다." };

        await database.comment.update({
            where: {
                id: comment.id,
            },
            data: {
                content: props.content,
                update_time: getCurrentTimeFormatted(),
            },
        });
    }

    async deleteComment(post_id, comment_id, member) {
        const comment = await database.comment.findUnique({
            where: {
                id: comment_id,
            },
        });

        const post = await database.post.findUnique({
            where: {
                id: post_id,
            },
        });
        if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다." };
        if (!comment)
            throw { status: 404, message: "댓글을 찾을 수 없습니다." };

        if (post.member_id !== member.id && comment.member_id !== member.id)
            throw { status: 403, message: "본인글만 수정이 가능합니다." };

        await database.comment.delete({
            where: {
                id: comment.id,
            },
        });
    }
}
function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
