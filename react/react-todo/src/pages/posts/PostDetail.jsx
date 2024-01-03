import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams(); // URL에서 동적 파라미터(id)를 가져오기
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                const response = await fetch(`http://localhost:8000/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
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

    return (
        <div>
            <h2>{post.post.title}</h2>
            <p>{post.post.content}</p>
            <p>조회수: {post.post.views}</p>

            <h3>댓글</h3>
            <ul>
                {post.post.comments && post.post.comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.member.email}</strong>: {comment.text}
                        {/* 필요하다면 중첩된 댓글(re_comment)을 추가하세요. */}
                    </li>
                ))}
            </ul>

            <h3>태그</h3>
            <ul>
                {post.post.tag && post.post.tag.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                ))}
            </ul>
        </div>
    );

};

export default PostDetail;
