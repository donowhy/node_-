import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/section/Main';

const Home = () => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('login-token')) {
            setToken(true);
        }
    }, []);

    return (
        <Main title="Home" description="Welcome to Our Website">
            <div className="home-container">
                <h1>Welcome to Our Site</h1>
                <p>Experience our fantastic work list.</p>
                <p>However, all features must be logged in.</p>
                <p>If it's your first time, please come and sign up.</p>

                {!token ? (
                    <div className="navigation-buttons">
                        <Link to="/sign-up" className="nav-button">
                            Sign Up
                        </Link>
                        <Link to="/login" className="nav-button">
                            Login
                        </Link>
                    </div>
                ) : null}
            </div>
        </Main>
    );
};

export default Home;
