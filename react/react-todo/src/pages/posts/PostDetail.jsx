import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Main from "../../components/section/Main";
import base64 from "base-64";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [comment, setComment] = useState('');

    const fetchPostDetail = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');
            const response = await fetch(`http://localhost:8000/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            let payload = accessToken.substring(accessToken.indexOf('.') + 1, accessToken.lastIndexOf('.'));
            let decoded = base64.decode(payload);
            const decodedObject = JSON.parse(decoded);
            const loginId = decodedObject.id;

            if (response.ok) {
                const data = await response.json();
                setPost(data);
                setCurrentUser(loginId);
            } else {
                console.error('Failed to load post details.');
            }
        } catch (error) {
            console.error('Error while fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPostDetail();
    }, [id]);

    const handleCommentSubmit = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');
            await fetch(`http://localhost:8000/posts/${id}`, {  // 주소와 메서드 수정
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ content: comment }),
            });
            setComment('');
            fetchPostDetail();  // 데이터를 새로고침합니다.
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    if (!currentUser) {
        return <p>Loading user data...</p>;
    }

    return (
        <Main>
            <div className='post-detail-container'>
                <h2 className='post-title'>{post.post.title}</h2>
                <h3 className='tags'>Tags</h3>
                <ul className='tag-list'>
                    {post.post.tag && post.post.tag.map((tag) => (
                        <li key={tag.id}>{tag.name}</li>
                    ))}
                </ul>
                <p className='post-content'>{post.post.content}</p>
                <div className='post-info'>
                    <p className='likes-count'>Likes: {post.post.like_post.length}</p>
                    <p className='creation-time'>Created: {post.post.create_time}</p>
                    <p className='update-time'>Updated: {post.post.update_time}</p>
                    <p className='views-count'>Views: {post.post.views}</p>
                </div>
                <h3 className='comments-header'>Comments</h3>
                <ul className='comments-list'>
                    {post.post.comment && post.post.comment.map((comment) => (
                        <li key={comment.id}>
                            <p className='comment-content'>{comment.content}</p>
                            <p className='comment-info'>Posted at: {comment.create_time}</p>
                        </li>
                    ))}
                </ul>
                <div className='comment-input'>
                    <textarea
                        placeholder='Write your comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button onClick={handleCommentSubmit}>Post Comment</button>
                </div>
            </div>
        </Main>
    );
};

export default PostDetail;
