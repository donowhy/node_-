const Chatapi_Node = {
    sendMessage: async (roomId, sender, msg) => {
        const sendMsg = {
            roomId: roomId,
            sender: sender,
            msg: msg,
            time: Date.now()
        };

        try {
            const accessToken = localStorage.getItem('login-token');

            await fetch(`http://localhost:8000/chat/${roomId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(sendMsg),
            });

            console.log('success');
        } catch (error) {
            console.error('Error sending message:', error);
            console.log('error');
        }
    },
};

export default Chatapi_Node;