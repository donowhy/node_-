import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Main from "../../components/section/Main";
import base64 from "base-64";

const PostDetail = () => {
    const { id } = useParams(); // URL에서 동적 파라미터(id)를 가져오기
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                const response = await fetch(`http://localhost:8000/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                let payload = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
                let decoded = base64.decode(payload);
                const decodedObject = JSON.parse(decoded);
                // id 값 추출
                const loginId = decodedObject.id;
                console.log(loginId, "값");
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    setCurrentUser(loginId)
                    console.log(data)
                } else {
                    console.error('포스트 상세 정보를 불러오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('포스트 상세 정보를 불러오는 중 에러가 발생했습니다:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [id]); // 파라미터 값이 변경될 때마다 다시 불러오기

    if (loading) {
        return <p>Loading...</p>;
    }
    console.log(post.title);
    if (!post) {
        return <p>포스트를 찾을 수 없습니다.</p>;
    }

    if (!currentUser) {
        return <p>사용자 정보를 불러오는 중입니다.</p>;
    }

    // const handleLikeClick = async () => {
    //
    //     console.log(post.post.likes, "likes");
    //
    //     if (!post || !Array.isArray(post.likes)) {
    //         console.error('게시물 데이터가 유효하지 않습니다.');
    //         return;
    //     }
    //
    //     const alreadyLiked = post.likes.includes(currentUser.login_id);
    //     const endpoint = alreadyLiked ? `delete-like/${id}` : `like-post/${id}`;
    //     const method = alreadyLiked ? 'DELETE' : 'POST';
    //     console.log("endPoint", endpoint, " method", method)
    //     if (!post || (!post.likes && method==="DELETE")) {
    //         console.error('게시물 데이터가 존재하지 않거나, 좋아요 정보가 없습니다.');
    //         return;
    //     }
    //
    //     try {
    //         const accessToken = localStorage.getItem('login-token');
    //         const response = await fetch(`http://localhost:8000/posts/${endpoint}`, {
    //             method: method,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //             body: JSON.stringify({
    //                 login_id: currentUser,
    //             }),
    //         });
    //         console.log(currentUser, "현재 유저");
    //         if (response.ok) {
    //             // 좋아요 상태 업데이트
    //             if (alreadyLiked) {
    //                 // 좋아요 취소
    //                 setPost({
    //                     ...post,
    //                     likes: post.post.likes.filter(login_id => login_id !== currentUser),
    //                 });
    //             } else {
    //                 // 좋아요
    //                 setPost({
    //                     ...post,
    //                     likes: [...post.likes, currentUser],
    //                 });
    //             }
    //         } else {
    //             console.error('좋아요 상태 변경 실패');
    //         }
    //     } catch (error) {
    //         console.error('좋아요 상태 변경 중 에러 발생', error);
    //     }
    // };

    // const likedByCurrentUser = post.likes && post.likes.includes(currentUser.login_id);

    return (
        <Main>
            <div className='post-detail-container'>
                <h2 className='post-title'>{post.post.title}</h2>
                <h3 className='tags'>태그</h3>
                <ul className='tag'>
                    {post.post.tag && post.post.tag.map((tag) => (
                        <li key={tag.id}>{tag.name}</li>
                    ))}
                </ul>
                <p className='post-content'>{post.post.content}</p>
                <p className='like_post'>좋아요: {post.post.like_post.length}</p>
                {/*<button type='button' onClick={handleLikeClick}>*/}
                {/*    {likedByCurrentUser ? '좋아요 취소' : '좋아요!'}*/}
                {/*</button>*/}
                <p className='create-time'>생성: {post.post.create_time}</p>
                <p className='update-time'>수정: {post.post.update_time}</p>
                <p className='post-views'>조회수: {post.post.views}</p>
                <p className='post-views'>ID: {post.post.member.login_id}</p>
                <h3 className='comments'>댓글</h3>
                <ul className='post-comments'>
                    {post.post.comments && post.post.comments.map((comment) => (
                        <li key={comment.id}>
                            <strong>{comment.member.email}</strong>: {comment.text}
                        </li>
                    ))}
                </ul>


            </div>
        </Main>
    );

};

export default PostDetail;
