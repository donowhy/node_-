import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Main from "../../components/section/Main";
import base64 from "base-64";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [comment, setComment] = useState('');
    const [likesname, setLikesname] = useState(null);
    const [likeStatus, setLikeStatus] = useState(false);
    const navigateFunction = useNavigate();

    const fetchPostDetail = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');
            if (!accessToken) {
                console.error('No access token available');
                navigateFunction('/')
                return;
            }
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
                console.log(data, "DATA")
                setPost(data);
                setCurrentUser(loginId);
                setLikesname(decodedObject.id);
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

    const handleLikeClick = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');

            await fetch(`http://localhost:8000/posts/like-post/${post.post.id}`, {  // 주소와 메서드 수정
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setLikeStatus(true);
            fetchPostDetail();  // 데이터를 새로고침합니다.
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleUnlikeClick = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');
            await fetch(`http://localhost:8000/posts/delete-like/${post.post.id}`, {  // 주소와 메서드 수정
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setLikeStatus(false);
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
                    <p className='likes'>
                        {(
                            post.post.like_post &&
                            likeStatus)
                         ? (
                            <button onClick={handleUnlikeClick}>👎</button>
                        ) : (
                            <button onClick={handleLikeClick}>👍</button>
                        )}
                    </p>

                    <p className='likes-count'> {post.post.like_post.length}</p>
                    <p className='creation-time'>생성: {post.post.create_time}</p>
                    <p className='update-time'>수정: {post.post.update_time}</p>
                    <p className='views-count'>조회수: {post.post.views}</p>
                </div>
                <h3 className='comments-header'>댓글</h3>
                <ul className='comments-list'>
                    {post.post.comment && post.post.comment.map((comment) => (
                        <li key={comment.id}>
                            <p className='comment-content'>{comment.content}</p>
                            <p className='comment-info'>{comment.create_time.toLocaleDateString}</p>
                        </li>
                    ))}
                </ul>
                <div className='comment-input'>
                    <textarea
                        placeholder='Write your comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <p>
                        <button onClick={handleCommentSubmit}>Post Comment</button>
                    </p>
                </div>
            </div>
        </Main>
    );
};

export default PostDetail;
