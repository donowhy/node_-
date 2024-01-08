import React, { useState, useEffect } from 'react';
import Main from '../components/section/Main';
import {useNavigate} from "react-router-dom";

const TodayTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    let navigateFunction = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                if (!accessToken) {
                    console.error('No access token available');
                    navigateFunction('/')
                    setLoading(false);
                    return;
                }
                const today = new Date().toISOString().split('T')[0]; // 오늘의 날짜를 ISO 형식으로 가져오기

                const response = await fetch(`http://localhost:8000/todo?startdate=${today}&enddate=${today}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                setTodos(data.todos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleToggleChecked = async (id, checked) => {
        try {
            const accessToken = localStorage.getItem('login-token');
            const newCheckedValue = !checked;

            const endpoint = newCheckedValue ? `done/${id}` : `${id}`;

            await fetch(`http://localhost:8000/todo/${endpoint}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    checked: newCheckedValue,
                }),
            });

            // Update the local state
            const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, checked: newCheckedValue } : todo));
            setTodos(updatedTodos);

        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };


    const handleCreateTodo = () => {
        // '할 일 작성' 버튼 클릭 시, 할 일 작성 페이지로 이동
        navigateFunction('/create-todo');
    };

    return (
        <Main title="Today's tasks" description="오늘의 할 일들 입니다.">
            <div className="today-todo-list">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {todos.length > 0 ? (
                            <>
                                <p>할 일 today</p>
                                <p>
                                    <h3>{todos[0].local_date}</h3>
                                </p>
                                {todos.map((todo) => (
                                    <li key={todo.id} onClick={() => handleToggleChecked(todo.id, todo.checked)}>
                                        {todo.checked ? (
                                            <span>☑</span>
                                        ) : (
                                            <span>□</span>
                                        )}
                                        <strong>할 일 이름 {todo.content}</strong>
                                        <p>중요도 : {todo.important}</p>
                                        {/* 기타 필요한 정보들을 표시할 수 있음 */}
                                    </li>
                                ))}
                                <button onClick={handleCreateTodo}>할 일 작성</button>
                            </>
                        ) : (
                            <>
                                <p>오늘의 할 일을 작성해주세요.</p>
                                <button onClick={handleCreateTodo}>할 일 작성</button>
                            </>
                        )}
                    </ul>
                )
                }
            </div>
        </Main>
);
};

export default TodayTodoList;
