import { MemberDto } from "../../members/dto";
import { TagDto } from "./tagDto";
import { CommentDto } from "./commentDto/CommentDto";
import { ReCommentDto } from "./commentDto/ReCommentDto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostDto {
    id;
    title;
    content;
    create_time;
    update_time;
    like_post;
    member;
    tag;
    comment;
    views;

    constructor(props, member) {
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.create_time = props.create_time;
        this.update_time = props.create_time;
        this.like_post = props.like_post.length;
        this.member = new MemberDto(props.member);
        this.tag = props.tag.map(
            (t) =>
                new TagDto({
                    id: t.id,
                    name: t.name,
                })
        );

        // Check if props.comment is defined before mapping
        this.comment =
            props.comment &&
            props.comment.map(
                (comment) =>
                    new CommentDto({
                        id: comment.id,
                        content: comment.content,
                        create_time: comment.create_time,
                        update_time: comment.update_time,
                        member: comment.member,
                        re_comment:
                            comment.re_comment &&
                            comment.re_comment.map(
                                (reComment) =>
                                    new ReCommentDto({
                                        id: reComment.id,
                                        content: reComment.content,
                                        create_time: reComment.create_time,
                                        update_time: reComment.update_time,
                                        member: reComment.member,
                                    })
                            ),
                    })
            );
        this.views = props.views;
    }
}
