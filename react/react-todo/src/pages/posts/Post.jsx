import React, { useState, useEffect } from 'react';
import Main from '../../components/section/Main';
import {useNavigate} from "react-router-dom";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [token, setToken] = useState(""); // State to store the token

    useEffect(() => {
        // Retrieve token from localStorage on component mount
        const storedToken = localStorage.getItem('login-token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    let navigateFunction = useNavigate();

    const handleCreateTodo = () => {
        // '할 일 작성' 버튼 클릭 시, 할 일 작성 페이지로 이동
        navigateFunction('/post/register');
    };

    const getData = async (e) => {
        e.preventDefault();

        try {
            // Build the URL based on the presence of searchValue
            let url = 'http://localhost:8000/posts';
            if (searchValue) {
                url += `?searchValue=${searchValue}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include the token in the headers if available
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setPosts(data.posts);
                setCount(data.count);
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error during data fetching:', error);
        }
    };

    return (
        <Main
            title="Home"
            description="HOME"
        >
            <div>
                <form onSubmit={getData}>
                    <label>
                        Search:
                        <input type="text" value={searchValue}
                               onChange={(e) =>
                                   setSearchValue(e.target.value)}/>

                    </label>
                    <button type="submit">Fetch Posts</button>
                </form>
                <h2>게시물</h2>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title} {post.create_time} {post.member.login_id}</li>
                    ))}
                </ul>
                <p>Total Count: {count}</p>
                <button onClick={handleCreateTodo}>할 일 작성</button>
            </div>
        </Main>
    );
};

export default Post;
