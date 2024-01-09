// TodoRegister.jsx
import React, { useState } from 'react';
import Main from "../../components/section/Main";
import {useNavigate} from "react-router-dom";

const TodoRegister = () => {
    const [content, setContent] = useState('');
    const [important, setImportant] = useState('LOW');
    const [localDate, setLocalDate] = useState('');
    let navigateFunction = useNavigate();
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImportantChange = (e) => {
        setImportant(e.target.value);
    };

    const handleLocalDateChange = (e) => {
        setLocalDate(e.target.value);
    };

    const handleTodoRegister = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');
            if (!accessToken) {
                console.error('No access token available');
                navigateFunction('/')
                return;
            }
            const response = await fetch('http://localhost:8000/todo/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    content,
                    important,
                    localDate,
                }),
            });

            if (response.ok) {
                console.log('Todo registered successfully');
                // Additional logic after successful registration, e.g., redirect to TodoList page
            } else {
                console.error('Failed to register todo');
            }

            navigateFunction("/to-do")
        } catch (error) {
            console.error('Error registering todo:', error);
        }
    };

    return (
        <Main>
            <div className="todo-register-container">
                <h2>Todo Register</h2>
                <label>
                    Content:
                    <input type="text" value={content} onChange={handleContentChange}/>
                </label>
                <br/>
                <label>
                    Importance:
                    <select value={important} onChange={handleImportantChange}>
                        <option value="LOW">Low</option>
                        <option value="MIDDLE">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </label>
                <br/>
                <label>
                    Local Date:
                    <input type="date" value={localDate} onChange={handleLocalDateChange}/>
                </label>
                <br/>
                <button onClick={handleTodoRegister}>
                    Register Todo
                </button>
            </div>
        </Main>
    );
};

export default TodoRegister;
