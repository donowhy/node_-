import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Main from "../../components/section/Main";
import base64 from 'base-64';

const MemberPage = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const memberId = parseInt(id, 10);
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
                const response = await fetch(`http://localhost:8000/members/detail/${memberId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                console.log(data.member.post, "DATA")
                setMember(data.member);
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

    const privacyIcon = member.openPrivacy ? '👥' : '🔒';

    return (
        <Main title="My Page" description="나의 페이지입니다.">
            <div className="my-page-container">
                <h2>My Profile</h2>
                <p><strong>Member ID:</strong> {member.loginId}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Nickname:</strong> {member.nickname}</p>
                <p> {privacyIcon}</p>
                {member.post && member.post.length > 0 && (
                    <div className="posts-section">
                        <h3>{member.loginId} Posts</h3>
                        {member.post.map(post => (
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

export default MemberPage;
