import database from "../../../database";

export class ChatRoomService {
    async roomInit(roomId) {
        const room = await database.chat_room.create({
            data: {
                room_id : roomId
            }
        });
        return room.id;
    }
}