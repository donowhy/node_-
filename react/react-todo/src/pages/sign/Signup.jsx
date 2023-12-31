import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Main from "../../components/section/Main";
class RegisterDTO {
    constructor(login_id, nickname, email, password) {
        this.login_id = login_id;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
}

const Signup = () => {
    const [registerData, setRegisterData] = useState(
        new RegisterDTO("", "", "", "")
    );

    let navigateFunction = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const apiUrl = "http://localhost:8000/auth/sign-up"; // 실제 백엔드 서버의 엔드포인트로 변경해야 합니다.

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            if (response.ok) {
                console.log("데이터가 성공적으로 전송되었습니다.");
                navigateFunction("/");
                // 여기에서 다음 작업을 수행할 수 있습니다.
            } else {
                console.error("데이터 전송 실패");
            }
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };


    return (
        <Main>
        <div className='signup'>
            <ul className='navigation'>
                <li>
                    Sign Up
                </li>
                <li>
                    <Link
                        to="/login"
                    >
                        Sign In
                    </Link>
                </li>
            </ul>
            <label htmlFor="login_id" className='login_id'></label>
            <input
                className='login_input'
                type="text"
                placeholder="login_id"
                name="login_id"
                value={registerData.login_id}
                onChange={handleChange}
            />

            <label htmlFor="nickname" className='nickname'></label>
            <input
                className='nickname_input'
                type="text"
                placeholder="nickname"
                name="nickname"
                value={registerData.nickname}
                onChange={handleChange}
            />

            <label htmlFor="email" className='email'></label>
            <input
                className='email_input'
                type="email"
                placeholder="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
            />

            <label htmlFor="password" className='password'></label>
            <input
                className='password_input'
                type="password"
                placeholder="password"
                name="password"
                value={registerData.password}
                onChange={handleChange}
            />

            <button type="button" onClick={handleSubmit} className='button'>
                SignUp
            </button>

        </div>
        </Main>
    );
};

export default Signup;
