import database from "../../../database";
import produceMessage from "../utils/producer";

export class Chatting {

    async chat (msg, room_idx, sender){
        console.log({msg, room_idx, sender});

        const documentClient = await database.chat_document.create({
            data: {
                msg : msg,
                room_idx : room_idx,
                sender_name : String(sender),
                created_at : String(Date.now())
            }
        });

        await produceMessage({
            message: msg,
            roomId: room_idx,
            from: sender,
            time: Date.now()
        });

        return documentClient.id;
    }
}
