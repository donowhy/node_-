// TodoList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Main from '../components/section/Main';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateFunction = useNavigate();

    // URL 파라미터를 읽어오기 위해 useParams 훅 사용
    const { startdate, enddate } = useParams();
    const [startDateParam, setStartDateParam] = useState(startdate || '1900-01-01');
    const [endDateParam, setEndDateParam] = useState(enddate || '2099-12-31');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');

                // useState로 관리하는 파라미터를 사용
                const response = await fetch(`http://localhost:8000/todo?startdate=${startDateParam}&enddate=${endDateParam}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                console.log(data);

                // Sort todos based on local_date in ascending order
                const sortedTodos = data.todos.sort((a, b) => new Date(a.local_date) - new Date(b.local_date));
                setTodos(sortedTodos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [startDateParam, endDateParam]); // URL 파라미터가 변경될 때마다 useEffect 실행

    const handleCreateTodo = () => {
        // '할 일 작성' 버튼 클릭 시, 할 일 작성 페이지로 이동
        navigateFunction('/create-todo');
    };

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


    return (
        <Main title="today tasks" description="오늘의 할 일들 입니다.">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id} onClick={() => handleToggleChecked(todo.id, todo.checked)}>
                                {todo.checked ? (
                                    <span>☑</span>
                                ) : (
                                    <span>□</span>
                                )}
                                <strong>할 일 이름 {todo.content}</strong>
                                <p>중요도: {todo.important}</p>
                                <p>계획된 날짜: {new Date(todo.local_date).toISOString().split('T')[0]}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCreateTodo}>할 일 작성</button>
                </div>
            )}
        </Main>
    );
};

export default TodoList;
