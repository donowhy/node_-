export class CreatePostDTO {
    title;
    content;
    memberId;
    tags; //["thread", "javascript"]

    constructor(props) {
        this.title = props.title;
        this.content = props.content;
        this.member_member_id = props.memberId;
        this.tags = props.tags;
    }
}
