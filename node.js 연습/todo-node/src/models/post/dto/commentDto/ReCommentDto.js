import { MemberDto } from "../../../users/dto";

export class ReCommentDto {
    id;
    create_time;
    update_time;
    content;
    member;

    constructor(props) {
        this.id = props.id;
        this.content = props.content;
        this.create_time = props.create_time;
        this.update_time = props.create_time;
        this.member = new MemberDto(props.member);
    }
}
