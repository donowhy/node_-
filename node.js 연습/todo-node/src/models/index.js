import { AuthController, AuthSwagger } from "./auth/auth";
import { UserController, UserSwagger } from "./members";
import { PostController } from "./post";
import { TodoController } from "./todo";
import {ChattingController} from "./chatting";

export const Controllers = [
    AuthController,
    UserController,
    PostController,
    TodoController,
    ChattingController
];
export const Swaggers = {
    UserSwagger,
    AuthSwagger,
};
