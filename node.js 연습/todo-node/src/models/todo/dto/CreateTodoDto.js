export class CreateTodoDto {
    content;
    important;
    local_date; // 수정된 부분

    constructor(props) {
        this.content = props.content;
        this.important = props.important;
        this.local_date = props.localDate;
    }
}
