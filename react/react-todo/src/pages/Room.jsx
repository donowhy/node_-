import React, { useEffect, useState } from 'react';
import Main from "../components/section/Main";
import { useNavigate } from "react-router-dom";

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomName] = useState("");
    const navigateFunction = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                if (!accessToken) {
                    console.error('No access token available');
                    navigateFunction('/');
                    return;
                }

                const response = await fetch(`http://localhost:8083/api/chat/rooms`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const enterRoom = async (roomId) => {
        try {
            const accessToken = localStorage.getItem('login-token');
            if (!accessToken) {
                console.error('No access token available');
                navigateFunction('/');
                return;
            }
            const response = await fetch(`http://localhost:8083/api/chat/${roomId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            navigateFunction(`/kafka/${roomId}`);
            alert(`Room ${roomId}에 입장하였습니다.`);
        } catch (error) {
            console.error('Failed to enter room:', error);
        }
    };

    const registerRoom = async (roomName) => {
        try {
            const accessToken = localStorage.getItem('login-token');
            if (!accessToken) {
                console.error('No access token available');
                navigateFunction('/');
                return;
            }
            const response = await fetch(`http://localhost:8083/api/chat/room`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    roomId
                }),
            });
            const data = await response.json();

            // 생성 후 새로고침
            window.location.reload();
        } catch (error) {
            console.error('Failed to register room:', error);
        }
    };

    return (
        <Main>
            <div>
                <h1>Rooms</h1>
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <div key={room.roomId}>
                            <h2>{room.roomId}</h2>
                            <h2>{room.people}</h2>
                            <button onClick={() => enterRoom(room.roomId)}>Enter</button>
                        </div>
                    ))
                ) : (
                    <p>현재 참여중인 방 없음!</p>
                )}
                <input
                    value={roomId}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <button onClick={() => registerRoom(roomId)}>
                    생성
                </button>
            </div>
        </Main>
    );
};

export default Room;
