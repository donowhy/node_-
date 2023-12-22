export class UpdatePostDto {
    title;
    content;
    tag;

    constructor(props) {
        this.title = props.title;
        this.content = props.content;
        this.tag = props.tag;
    }
}
