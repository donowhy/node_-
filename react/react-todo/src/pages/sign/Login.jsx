import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function LoginPage() {

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    let navigateFunction = useNavigate();

    const onLoginIdHandler = (event) => {
        setLoginId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        console.log('login_id', loginId);
        console.log('password', password);

        try {
            let body = {
                login_id: loginId,
                password: password,
            };

            // Make a POST request to your backend API
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('login-token', data.accessToken);
                navigateFunction('/');

            } else {
                // Handle errors if the request was not successful
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}
            >
                <label>Id</label>
                <input type='id' value={loginId} onChange={onLoginIdHandler}/>
                <label>Password</label>
                <input type='password' value={password} onChange={onPasswordHandler}/>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;
