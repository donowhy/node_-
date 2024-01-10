import { Router } from "express";
import {ChatRoomService} from "../service/ChatRoomService";
import {Chatting} from "../service/Chatting";

class ChattingController {
    router;
    path = "/chat";
    ChattingRoomService;
    Chatting;

    constructor() {
        this.router = Router();
        this.ChattingRoomService = new ChatRoomService();
        this.Chatting = new Chatting();
        this.init();
    }

    init() {
        this.router.post("/room-init", this.roomInit.bind(this));
        this.router.post("/:id", this.chat.bind(this));
    }

    async roomInit(req, res, next) {
        try {
            const body = req.body;
            console.log(body);
            const newRoom = await this.ChattingRoomService.roomInit(
                    body.roomId,
            );
            res.status(201).json({ id: newRoom.id });
        } catch (err) {
            console.log(err)
            next(err);
        }
    }

    async chat (req, res, next) {
        try {
            console.log(req , "CHAT REQ");
            const { id } = req.params;
            const roomIdx = parseInt(id, 10);

            const body = req.body;
            console.log(body);
            const newChat = await this.Chatting.chat(
                body.msg,
                roomIdx,
                body.sender,
            )
            res.status(201).json({ id: newChat.id });
        }catch (err) {
            console.log(err);
            next(err);
        }
    }
}


const chattingController = new ChattingController();
export default chattingController;
