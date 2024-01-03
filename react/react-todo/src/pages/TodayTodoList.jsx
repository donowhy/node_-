import React, { useState, useEffect } from 'react';
import Main from '../components/section/Main';

const TodayTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');

                const today = new Date().toISOString().split('T')[0]; // 오늘의 날짜를 ISO 형식으로 가져오기
                console.log(today);

                const response = await fetch(`http://localhost:8000/todo?startdate=${today}&enddate=${today}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                console.log(data);
                setTodos(data.todos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Main title="Today's tasks" description="오늘의 할 일들 입니다.">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    <p>할 일 today</p>
                    <p><h3>{todos[0].local_date}</h3></p>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <strong>할 일 이름 {todo.content}</strong>
                            <p>중요도 : {todo.important}</p>
                            {/* 기타 필요한 정보들을 표시할 수 있음 */}
                        </li>
                    ))}
                </ul>
            )}
        </Main>
    );
};

export default TodayTodoList;
