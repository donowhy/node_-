import database from "../../../database";
import { MemberService } from "../../users/service";

export class TodoService {
    memberService;

    constructor() {
        this.memberService = new MemberService();
    }

    // TodoService의 createTodo 메서드 수정
    async createTodo(props) {
        const member = await database.member.findMemberById(props.memberId);

        const newTodo = await database.todo_list.create({
            data: {
                content: props.content,
                checked: false,
                important: props.important,
                local_date: props.localDate,
                member_member_id: {
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
}

// 클래스 외부에서 getCurrentTimeFormatted 함수 정의
const getCurrentTimeFormatted = () => new Date().toISOString();
