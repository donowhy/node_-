import { AuthController, AuthSwagger } from "./auth/auth";
import { UserController, UserSwagger } from "./members";
import { PostController } from "./post";
import { TodoController } from "./todo";

export const Controllers = [
    AuthController,
    UserController,
    PostController,
    TodoController,
];
export const Swaggers = {
    UserSwagger,
    AuthSwagger,
};
