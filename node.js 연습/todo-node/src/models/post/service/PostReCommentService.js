import database from "../../../database";
import { MemberService } from "../../users/service";

export class PostReCommentService {
    memberService;

    constructor() {
        this.memberService = new MemberService();
    }

    async CreateReComment(commentId, props) {
        const member = await this.memberService.findMemberById(props.member_id);

        const comment = await database.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!comment) throw { status: 404, message: "댓글을 찾을 수 없음." };

        const newReComment = await database.re_comment.create({
            data: {
                content: props.content,
                comment: {
                    connect: {
                        id: comment.id,
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

        return newReComment.id;
    }

    async updateReComment(commentId, reCommentId, props) {
        const member = await this.memberService.findMemberById(props.member_id);
        const comment = await database.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        const reComment = await database.re_comment.findUnique({
            where: {
                id: reCommentId,
            },
        });

        if (!comment)
            throw { status: 404, message: "댓글을 찾을 수 없습니다." };

        if (
            comment.member_id !== member.id &&
            reComment.member_id !== member.id
        )
            throw { status: 403, message: "본인글만 수정이 가능합니다." };

        await database.re_comment.update({
            where: {
                id: reComment.id,
            },
            data: {
                content: props.content,
                update_time: getCurrentTimeFormatted(),
            },
        });
    }

    async deleteReComment(commentId, reCommentId, props) {
        const member = await this.memberService.findMemberById(props.member_id);
        const comment = await database.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        const reComment = await database.re_comment.findUnique({
            where: {
                id: reCommentId,
            },
        });

        if (!comment)
            throw { status: 404, message: "댓글을 찾을 수 없습니다." };

        if (
            comment.member_id !== member.id &&
            reComment.member_id !== member.id
        )
            throw { status: 403, message: "본인글만 수정이 가능합니다." };

        await database.re_comment.delete({
            where: {
                id: reComment.id,
            },
        });
    }
}

function getCurrentTimeFormatted() {
    const currentTime = new Date();
    return currentTime.toISOString();
}
