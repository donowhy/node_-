const consumeMessages = require('./utils/consumer.js');
const produceMessage = require('./utils/producer.js');
const { Server } = require("socket.io");
const io = new Server();

// Kafka Consumer로부터 메시지를 받아 특정 방에 브로드캐스트
consumeMessages(({ from, to, message, roomId }) => {
    // RoomId를 기반으로 메시지를 해당 방에만 브로드캐스트
    io.to(roomId).emit('newMessage', { from, to, message });
});

io.on('connection', (socket) => {
    // 클라이언트에게 연결 성공 메시지를 보냄
    socket.emit('welcome', { message: 'Chat connected', id: socket.id });

    // 방에 가입하는 이벤트 리스너
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        socket.to(roomId).emit('joinedRoom', { message: `User ${socket.id} has joined room ${roomId}` });
    });

    // 클라이언트로부터 메시지를 받아 Kafka Producer로 전송
    socket.on('sendMessage', ({ message, to, roomId }) => {
        produceMessage({ from: socket.id, to, message, roomId });
    });

    // 클라이언트가 방을 떠나는 이벤트 리스너
    socket.on('leaveRoom', ({ roomId }) => {
        socket.leave(roomId);
        socket.to(roomId).emit('leftRoom', { message: `User ${socket.id} has left room ${roomId}` });
    });
});
