export class CreatePostDto {
    title;
    content;
    member_member_id;
    tag;

    constructor(props) {
        this.title = props.title;
        this.content = props.content;
        this.member_member_id = props.member_member_id;
        this.tag = props.tag;
    }
}
