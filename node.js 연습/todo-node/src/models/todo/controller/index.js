import { Router } from "express";
import { TodoService } from "../service";
import { CreateTodoDTO } from "../dto";
import { pagination } from "../../../middleware/pagination";

class TodoController {
    router;
    path = "/todo";
    todoService;

    constructor() {
        this.router = new Router();
        this.todoService = new TodoService();
        this.init();
    }

    init() {
        this.router.post("/register", this.createTodo.bind(this));
    }

    async createTodo(req, res, next) {
        try {
            if (!req.member)
                throw { status: 401, message: "로그인을 진행해주세요." };
            const body = req.body;

            const newTodoId = await this.todoService.createTodo(
                new CreateTodoDTO({
                    content: body.content,
                    important: body.important,
                    local_date: body.localDate,
                    member_member_id: body.memberId,
                })
            );
            res.status(201).json({ id: newTodoId });
        } catch (err) {
            next(err);
        }
    }
}

const TodoController = new TodoController();
export default TodoController;
