// import React, { useEffect, useState } from 'react';
// import Chatapi from './Chatapi_Node';
// import Main from '../section/Main';
// import Input from './Input_Node';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import Messages from './Messages_Node';
// import base64 from 'base-64';
// import { io } from "socket.io-client";
//
// const Chat_Node = () => {
//     const SOCKET_URL = 'http://localhost:8000';
//     const { roomId } = useParams();
//     const [message, setMessage] = useState([]);
//     const [member, setMember] = useState(null);
//     const navigate = useNavigate();
//     const socket = io(SOCKET_URL);
//
//     useEffect(() => {
//         const fetchMember = async () => {
//             try {
//                 const accessToken = localStorage.getItem('login-token');
//                 if (!accessToken) {
//                     console.error('접근 토큰을 찾을 수 없습니다.');
//                     navigate('/');
//                     return;
//                 }
//                 let payload = accessToken.substring(
//                     accessToken.indexOf('.') + 1,
//                     accessToken.lastIndexOf('.')
//                 );
//                 let decoded = base64.decode(payload);
//                 const decodedObject = JSON.parse(decoded);
//                 const memberId = decodedObject.id;
//
//                 setMember(memberId);
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         fetchMember();
//
//         socket.on('message', message => {
//             console.log(message, "MESSAGE");
//             onMessageReceived(message);
//         });
//
//         return () => {
//             socket.off('message');
//         };
//     }, [navigate, socket]);
//
//     const onSendMessage = async (msg) => {
//         if (roomId && member) {
//             Chatapi
//                 .sendMessage(roomId, member, msg)
//                 .then((res) => {
//                     console.log('전송되었습니다', res);
//                 })
//                 .catch((err) => {
//                     console.log('메시지 전송 중 오류가 발생했습니다.');
//                 });
//             console.log(roomId, member, msg, "SEND MESSAGE")
//             const sendMsg =  {
//                 roomId, member, msg
//             }
//
//             setMessage(prevMessage => [...prevMessage, sendMsg]);
//         }
//     };
//
//     const onMessageReceived = (sendMsg) => {
//         console.log('새로운 메시지를 받았습니다!', sendMsg);
//         setMessage((prevMessages) => [...prevMessages, sendMsg]);
//     };
//
//     return (
//         <Main>
//             {member ? (
//                 <>
//                     <Messages messages={message} currentUser={member} />
//                     <Input roomId={roomId} onSendMessage={onSendMessage} />
//                 </>
//             ) : (
//                 <Link to="/sign-up">로그인</Link>
//             )}
//         </Main>
//     );
// };
//
// export default Chat_Node;
