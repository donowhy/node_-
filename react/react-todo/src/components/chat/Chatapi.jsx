const chatAPI = {
    sendMessage: async (roomId, sender, msg) => {
        const sendMsg = {
            roomId: roomId,
            sender: sender,
            msg: msg,
            time: Date.now()
        };

        try {
            const accessToken = localStorage.getItem('login-token');

            const response = await fetch(`http://localhost:8083/kafka/publish/${roomId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(sendMsg),
            });
            console.log(response, "RESPONSE")
            if (response.ok) {
                console.log('success');
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            console.log('error');
        }
    },
};

export default chatAPI;
