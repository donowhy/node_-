import React from 'react';
import Main from "../../components/section/Main";
import {useNavigate} from "react-router-dom";

const LogOut = () => {
    const navigateFunction = useNavigate();
    const logoutHandler = async () => {
        try {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload(true);
                navigateFunction('/');


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Main>
            <div onClick={logoutHandler}>
                LogOut
            </div>
        </Main>
    );
};

export default LogOut;