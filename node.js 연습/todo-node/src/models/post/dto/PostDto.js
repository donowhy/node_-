import { MemberDto } from "../../users/dto/MemberDto";
import { TagDto } from "./tagDto/TagDto";

export class PostDto {
    id;
    title;
    content;
    create_time;
    update_time;
    like_post;
    member;
    tag;

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
    }
}
