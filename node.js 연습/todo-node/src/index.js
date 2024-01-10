import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Server } from "socket.io";
import http from "http";
import { Controllers } from "./models";
import { swaggerDocs, options } from "./swagger";
import swaggerUi from "swagger-ui-express";
import database from "./database";
import { jwtAuth, log, noAuth } from "./middleware";
import consumeMessages from './models/chatting/utils/consumer'; // 경로가 맞는지 확인하세요

(async () => {
    const app = express();
    await database.$connect();

    // 기본 미들웨어 설정
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: "700mb" }));
    app.use(log);
    app.use(express.static('public'));


    // 컨트롤러 라우팅
    Controllers.forEach((controller) => {
        app.use(
            controller.path,
            controller.authRequired ? jwtAuth : noAuth,
            controller.router
        );
    });

    // Swagger 설정
    app.get("/swagger.json", (req, res) => {
        res.status(200).json(swaggerDocs);
    });
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, options));

    // 에러 핸들링 미들웨어
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            message: err.message || "서버에서 에러가 발생하였습니다.",
        });
    });


    // HTTP 서버 생성
    const server = http.createServer(app);

    // Socket.IO 설정
    const io = new Server(server, {
        cors: {
            origin: "*", // 필요에 따라 제한적인 CORS 설정을 적용해야 할 수 있습니다.
            methods: ["GET", "POST"]
        }
    });

    // Kafka Consumer 메시지를 Socket.IO를 통해 브로드캐스트
    consumeMessages(({ from, to, message, roomId }) => {
        io.to(roomId).emit('newMessage', { from, to, message });
    });

    // Socket.IO 연결 로직
    io.on('connection', (socket) => {
        // 생략 (위에서 제공된 socket.io 로직을 여기에 배치)
    });

    // 서버와 Socket.IO 서버 시작
    server.listen(8000, () => {
        console.log("서버가 8000 포트에서 시작되었습니다.");
    });
})();
