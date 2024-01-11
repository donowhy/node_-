// Chat.js
import React, { useEffect, useState } from 'react';
import chatAPI from './Chatapi';
import Main from '../section/Main';
import SockJsClient from 'react-stomp';
import Input from './Input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Messages from './Messages';
import base64 from 'base-64';

const Chat = () => {
    const SOCKET_URL = 'http://localhost:8083/my-chat'; // 서버 주소를 확인하고 필요한 경우 수정하세요.
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [member, setMember] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                if (!accessToken) {
                    console.error('접근 토큰을 찾을 수 없습니다.');
                    navigate('/');
                    return;
                }
                let payload = accessToken.substring(
                    accessToken.indexOf('.') + 1,
                    accessToken.lastIndexOf('.')
                );
                let decoded = base64.decode(payload);
                const decodedObject = JSON.parse(decoded);
                const memberId = decodedObject.id;

                setMember(memberId);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMember();
    }, [navigate]);

    const onMessageReceived = (sendMsg) => {
        console.log('새로운 메시지를 받았습니다!', sendMsg);
        setMessages((prevMessages) => [...prevMessages, sendMsg]);
    };

    const onSendMessage = (msg) => {
        if (roomId && member) {
            chatAPI
                .sendMessage(roomId, member, msg)
                .then((res) => {
                    console.log('전송되었습니다', res);
                })
                .catch((err) => {
                    console.log('메시지 전송 중 오류가 발생했습니다.');
                });
        }
    };

    return (
        <Main>
            {member ? (
                <>
                    <SockJsClient
                        url={SOCKET_URL}
                        topics={[`/topic/group/${roomId}`]}
                        onMessage={onMessageReceived}
                        debug={false}
                    />
                    <Messages messages={messages} currentUser={member} />
                    <Input roomId={roomId} onSendMessage={onSendMessage} />
                </>
            ) : (
                <Link to="/sign-up">로그인</Link>
            )}
        </Main>
    );
};

export default Chat;
