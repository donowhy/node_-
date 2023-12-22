export class CreateCommentDto {
    content;
    member_id;

    constructor(props) {
        this.content = props.content;
        this.member_id = props.member_id;
    }
}
