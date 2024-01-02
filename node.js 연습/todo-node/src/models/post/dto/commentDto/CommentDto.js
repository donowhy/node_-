import { ReCommentDto } from "./ReCommentDto";
import { MemberDto } from "../../../users/dto";
import database from "../../../../database";

export class CommentDto {
    id;
    content;
    create_time;
    update_time;
    member;
    re_comment;

    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.create_time = props.create_time;
        this.update_time = props.create_time;
        this.re_comment = props.re_comment;
    }
}
