document.addEventListener('DOMContentLoaded', function() {
    const socket = io.connect('http://localhost:8000');
    const roomInput = document.getElementById('roomInput');
    const handleInput = document.getElementById('handleInput');
    const messageInput = document.getElementById('messageInput');
    const output = document.getElementById('output');
    const feedback = document.getElementById('feedback');

    // Join Room 버튼 이벤트 리스너
    document.getElementById('joinBtn').addEventListener('click', function() {
        const roomId = roomInput.value;
        socket.emit('joinRoom', { roomId });
        output.innerHTML += `<p>Joined room ${roomId}</p>`;
    });

    // Send 버튼 이벤트 리스너
    document.getElementById('sendBtn').addEventListener('click', function() {
        const message = messageInput.value;
        const roomId = roomInput.value;
        const handle = handleInput.value;
        socket.emit('sendMessage', { message, to: handle, roomId });
        messageInput.value = '';
    });

    // Leave Room 버튼 이벤트 리스너
    document.getElementById('leaveBtn').addEventListener('click', function() {
        const roomId = roomInput.value;
        socket.emit('leaveRoom', { roomId });
        output.innerHTML += `<p>Left room ${roomId}</p>`;
    });

    // 메시지 수신 이벤트 리스너
    socket.on('newMessage', function(data) {
        feedback.innerHTML = '';
        output.innerHTML += `<p><strong>${data.from}: </strong>${data.message}</p>`;
    });

    // 타이핑 이벤트 리스너
    messageInput.addEventListener('keypress', function() {
        socket.emit('typing', handleInput.value);
    });

    // 타이핑 중인 사용자 표시
    socket.on('typing', function(data) {
        feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
    });
});
