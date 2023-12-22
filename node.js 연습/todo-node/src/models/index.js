import { AuthController, AuthSwagger } from "./auth/auth";
import { UserController, UserSwagger } from "./users";
import { PostController } from "./post";

export const Controllers = [AuthController, UserController, PostController];
export const Swaggers = {
    UserSwagger,
    AuthSwagger,
};
