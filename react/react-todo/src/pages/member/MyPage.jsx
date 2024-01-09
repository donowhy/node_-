import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Main from "../../components/section/Main";
import base64 from 'base-64';

const MyPage = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigateFunction = useNavigate();
    useEffect(() => {
        const fetchMember = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                if (!accessToken) {
                    console.error('No access token available');
                    navigateFunction('/')
                    setLoading(false);
                    return;
                }

                let payload = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
                let decoded = base64.decode(payload);
                const decodedObject = JSON.parse(decoded);
                const memberId = decodedObject.id;

                console.log("decode", decoded);
                const response = await fetch(`http://localhost:8000/members/detail/${memberId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                console.log(data, "DATA MYPAGE")
                setMember(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member data:', error);
                setLoading(false);
            }
        };

        fetchMember();
    }, [id]);

    if (loading) {
        return <Main title="My Page" description="나의 페이지입니다."><p>Loading...</p></Main>;
    }

    const privacyIcon = member.member.openPrivacy ? '👥' : '🔒';

    return (
        <Main title="My Page" description="나의 페이지입니다.">
            <div className="my-page-container">
                <h2>My Profile</h2>
                <p><strong>Member ID:</strong> {member.member.loginId}</p>
                <p><strong>Email:</strong> {member.member.email}</p>
                <p><strong>Nickname:</strong> {member.member.nickname}</p>
                <p> {privacyIcon}</p>
                {member.member.posts && member.member.posts.length > 0 && (
                    <div className="posts-section">
                        <h3>My Posts</h3>
                        {member.member.posts.map(post => (
                            <div key={post.id} className="post">
                                <p><strong>Title:</strong> {post.title}</p>
                                <p><strong>Content:</strong> {post.content}</p>
                                <p><strong>Views:</strong> {post.views}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Main>
    );
};

export default MyPage;
