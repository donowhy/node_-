import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Main from "../../components/section/Main";

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
        <Main>
            <div className='signup'>

                    <ul className='navigationSign'>
                        <li>
                            <Link
                                to="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            Sign In

                        </li>
                    </ul>


                    <input type='id' className='login_input' placeholder="login_id" value={loginId} onChange={onLoginIdHandler}/>
                    <input type='password' className='password_input' placeholder="password" value={password} onChange={onPasswordHandler}/>
                    <br/>
                    <button type="submit" className='button' onClick={onSubmitHandler}>
                        Login
                    </button>

            </div>
        </Main>
    )
}

export default LoginPage;
