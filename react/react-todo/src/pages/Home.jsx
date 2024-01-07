import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/section/Main';

const Home = () => {
    return (
        <Main
            title="Home"
            description="Welcome to Our Website"
        >
            <div className="home-container">
                <h1>Welcome to Our Site</h1>
                <p>Explore the amazing world of modern web development and design.</p>
                <div className="navigation-buttons">
                    <Link to="/sign-up" className="nav-button">Sign Up</Link>
                    <Link to="/login" className="nav-button">Login</Link>
                </div>
            </div>
        </Main>
    );
};

export default Home;
