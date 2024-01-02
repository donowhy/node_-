import { Router } from "express";
import { TodoService } from "../service/TodoService";
import { CreateTodoDto } from "../dto/CreateTodoDto";
import { pagination } from "../../../middleware";

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
        this.router.get("", pagination, this.getTodoss.bind(this));
        this.router.delete("/:id", this.deleteTodo.bind(this));
        this.router.patch("/done/:id", this.doneTodo.bind(this));
    }

    async createTodo(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요." };
            }
            const body = req.body;
            console.log(body);
            console.log(body.localDate);
            const newTodoId = await this.todoService.createTodo(
                new CreateTodoDto({
                    content: body.content,
                    important: body.important,
                    local_date: new Date(body.localDate),
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
            const todoId = parseInt(id, 10);

            await this.todoService.updateTodo(req, todoId);
            res.status(204).json(req.body.content);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getTodoss(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }

            const { startdate, enddate } = req.query;
            const { todos, count } = await this.todoService.getTodos(
                {
                    skip: req.skip,
                    take: req.take,
                },
                req.member.id,
                startdate,
                enddate
            );

            res.status(200).json({ todos: todos, count: count });
        } catch (err) {
            next(err);
        }
    }

    async deleteTodo(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해주세요" };
            }
            const member = req.member;
            const { id } = req.params;
            const todoId = parseInt(id, 10);
            await this.todoService.deleteTodo(member, todoId);
            res.status(204).json(req.body.content);
        } catch (err) {
            next(err);
        }
    }

    async doneTodo(req, res, next) {
        try {
            if (!req.member) {
                throw { status: 401, message: "로그인을 진행해 주세요" };
            }
            const member = req.member;
            const { id } = req.params;
            const todoId = parseInt(id, 10);
            await this.todoService.doneTodo(member, todoId);
            res.status(204).json(todoId);
        } catch (err) {
            next(err);
        }
    }
}

const todoController = new TodoController();
export default todoController;
