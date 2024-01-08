import React, { useState, useEffect } from 'react';
import Main from '../../components/section/Main';
import { useNavigate } from "react-router-dom";
import Search from "../../components/section/Search";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const navigateFunction = useNavigate();

    // Fetch posts from API
    const fetchData = async () => {
        const token = localStorage.getItem('login-token');
        if (!token) {
            console.error('No access token available');
            navigateFunction('/')
            return;
        }
        let url = 'http://localhost:8000/posts';
        if (searchValue) {
            url += `?searchValue=${encodeURIComponent(searchValue)}`;
        }

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts);
                setCount(data.count);
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error during data fetching:', error);
        }
    };



    useEffect(() => {
        fetchData(); // Call fetch data function
    }, [searchValue]); // If searchValue changes, fetch data again

    const handleCreatePost = () => {
        navigateFunction('/post/register');
    };

    const handleLinkTo = (id) => {
        return () => navigateFunction(`/post/${id}`);
    }


    return (
        <Main title="Home" description="HOME">
            <div className='posts'>
                <Search/>

                <ul className='post-list'>
                    {posts.map((post) => (
                        <li key={post.id} className='post-item' onClick={handleLinkTo(post.id)}>
                            <div className='post-title'>{post.title}</div>
                            <div className='post-meta'>
                                <span className='post-time'>{post.create_time}</span>
                                <span className='post-author'>{post.member.login_id}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className='total-count'>Total Count: {count}</p>
                <button className='create-post-button' onClick={handleCreatePost}>게시물 작성</button>
            </div>
        </Main>
    );
};

export default Post;
