import database from "../../../database";
import { MemberService } from "../../users/service";

export class TodoService {
    memberService;

    constructor() {
        this.memberService = new MemberService();
    }

    // TodoService의 createTodo 메서드 수정
    async createTodo(props, memberId) {
        const member = await this.memberService.findMemberById(memberId);

        const newTodo = await database.todo_list.create({
            data: {
                content: props.content,
                checked: false,
                important: props.important,
                local_date: props.localDate,
                member: {
                    connect: {
                        id: member.id,
                    },
                },
                create_time: getCurrentTimeFormatted(), // 수정된 부분
                update_time: getCurrentTimeFormatted(), // 수정된 부분
            },
        });

        return newTodo.id;
    }

    async updateTodo(props, todoId) {
        const member = await this.memberService.findMemberById(props.member.id);
        const todo = await database.todo_list.findUnique({
            where: {
                id: todoId,
            },
        });
        console.log(props.body);
        if (todo.member_id !== member.id)
            throw { status: 403, message: "본인글만 수정이 가능합니다." };

        await database.todo_list.update({
            where: {
                id: todo.id,
            },
            data: {
                content: props.body.content,
                important: props.body.important,
                local_date: props.body.local_date,
                update_time: getCurrentTimeFormatted(),
            },
        });
    }
}

// 클래스 외부에서 getCurrentTimeFormatted 함수 정의
const getCurrentTimeFormatted = () => new Date().toISOString();
