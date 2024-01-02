import { MemberDto } from "../../members/dto";

export class PostsDto {
    id;
    title;
    content;
    create_time;
    member;

    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.content = props.content;
        this.create_time = props.create_time;
        this.member = new MemberDto(props.member);
    }
}
