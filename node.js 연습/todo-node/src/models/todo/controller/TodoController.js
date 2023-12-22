import { Router } from "express";
import { TodoService } from "../service/TodoService";
import { CreateTodoDto } from "../dto/CreateTodoDto";
import { pagination } from "../../../middleware/pagination";
import { log } from "../../../middleware";

class TodoController {
    router;
    path = "/todo";
    todoService;
    authRequired = true;

    constructor() {
        this.router = new Router();
        this.todoService = new TodoService();
        this.init();
    }

    init() {
        this.router.post("/register", this.createTodo.bind(this));
        this.router.patch("/:id", this.updateTodo.bind(this));
    }

    async createTodo(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요." };
            }
            const body = req.body;
            console.log(body);
            const newTodoId = await this.todoService.createTodo(
                new CreateTodoDto({
                    content: body.content,
                    important: body.important,
                    local_date: body.localDate,
                }),
                req.member.id
            );
            res.status(201).json({ id: newTodoId });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async updateTodo(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요." };
            }
            const { id } = req.params;
            const postId = parseInt(id, 10);

            await this.todoService.updateTodo(req, postId);
            res.status(204).json(req.body.content);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

const todoController = new TodoController();
export default todoController;
