import jwt from "jsonwebtoken";
import database from "../database";
import dotenv from "dotenv";
dotenv.config();

export const jwtAuth = async (req, res, next) => {
    try {
        const headers = req.headers;
        const authorization = headers["Authorization"]
            ? headers["Authorization"]
            : headers["authorization"];
        // Bearer ${token} or undefined

        if (!authorization) {
            return res.status(404).send("Token not found");
        }

        if (
            authorization.includes("Bearer") ||
            authorization.includes("bearer")
        ) {
            if (typeof authorization === "string") {
                const bearers = authorization.split(" ");
                // bearers : ["Bearer", "token~~~"]
                if (bearers.length === 2 && typeof bearers[1] === "string") {
                    const accessToken = bearers[1];

                    const decodedToken = jwt.verify(
                        accessToken,
                        process.env.JWT_KEY
                    );

                    const member = await database.member.findFirst({
                        where: {
                            id: decodedToken.id,
                        },
                    });

                    if (member) {
                        req.member = member;
                        next();
                    } else {
                        next({
                            status: 404,
                            message: "유저를 찾을 수 없습니다.",
                        });
                    }
                } else {
                    next({ status: 400, message: "Token이 잘못되었습니다." });
                }
            } else {
                next({ status: 400, message: "Token이 잘못되었습니다." });
            }
        } else {
            next();
        }
    } catch (err) {
        next({ ...err, status: 403 });
    }
};

export const noAuth = (req, res, next) => {
    next();
};
