import React, {useEffect, useState} from 'react';
import { headerMenus } from '../../data/header';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 상태를 확인하는 로직이 있다고 가정하고, isLoggedIn 값을 업데이트합니다.
    // 예를 들면 로그인 버튼을 클릭하면 setIsLoggedIn(true)와 같이 호출할 수 있습니다.

    useEffect(() => {
        if (localStorage.getItem('login-token')) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <nav className="header__menu">
            <ul className="menu">
                {headerMenus.map((menu, key) => {
                    // 로그인 상태에 따라 메뉴를 렌더링하거나 숨깁니다.
                    if (isLoggedIn && (menu.src === '/sign-up' || menu.src === '/login')) {
                        return null; // 로그인 상태에서는 회원가입과 로그인 메뉴를 숨깁니다.
                    }

                    if (!isLoggedIn && menu.src ==='/logout'){
                        return null;
                    }

                    return (
                        <li key={key} className={location.pathname === menu.src ? 'active' : ''}>
                            <Link to={menu.src}>
                                {menu.icon}
                                {menu.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Menu;
