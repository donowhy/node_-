import database from "../../../database";
import { MemberService } from "../../members/service";

export class TodoService {
    memberService;

    constructor() {
        this.memberService = new MemberService();
    }

    // TodoService의 createTodo 메서드 수정
    async createTodo(props, memberId) {
        const member = await this.memberService.findMemberById(memberId);
        console.log("11111111111111");
        console.log(props);
        console.log("11111111111111");
        const newTodo = await database.todo_list.create({
            data: {
                content: props.content,
                checked: false,
                important: props.important,
                local_date: props.local_date,
                member: {
                    connect: {
                        id: member.id,
                    },
                },
                create_time: getCurrentTimeFormatted(),
                update_time: getCurrentTimeFormatted(),
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
                checked: false
            },
        });
    }

    async deleteTodo(props, todoId) {
        const member = await this.memberService.findMemberById(props.id);
        const todo = await database.todo_list.findUnique({
            where: {
                id: todoId,
            },
        });

        if (todo.member_id !== member.id)
            throw { status: 403, message: "본인글만 삭제가 가능합니다." };

        await database.todo_list.delete({
            where: {
                id: todo.id,
            },
        });
    }

    async getTodos({ skip, take }, memberId, startDate, endDate, searchValue) {
        const member = await this.memberService.findMemberById(memberId);
        const startdate = new Date(startDate);
        const enddate = new Date(endDate);

        const todos = await database.todo_list.findMany({
            where: {
                member_id: member.id,
                local_date: {
                    gte: startdate,
                    lte: enddate,
                },
                content: {
                    contains: searchValue ?? "",
                },
            },
            include: {
                member: true,
            },
            skip,
            take,
            orderBy: {
                local_date: "desc",
            },

        });
        const count = await database.todo_list.count({
            where: {
                member_id: member.id,
                content: {
                    contains: searchValue,
                },
                local_date: {
                    gte: startdate,
                    lte: enddate,
                },
            },
        });

        return { todos, count };
    }

    async doneTodo(props, todoId) {
        const member = await this.memberService.findMemberById(props.id);
        const todo = await database.todo_list.findUnique({
            where: {
                id: todoId,
            },
        });

        await database.todo_list.update({
            where: {
                id: todo.id,
            },
            data: {
                checked: true,
            },
        });
    }
}

const getCurrentTimeFormatted = () => new Date().toISOString();
