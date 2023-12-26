export class CreateTodoDto {
    content;
    important;
    local_date;

    constructor(props) {
        this.content = props.content;
        this.important = props.important;
        this.local_date = props.local_date;
    }
}
