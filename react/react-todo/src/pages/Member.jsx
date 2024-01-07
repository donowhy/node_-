import React, { useState, useEffect } from 'react';
import Main from "../components/section/Main";

const Member = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                // 예시로 멤버 ID를 1로 설정. 실제 애플리케이션에서는 동적으로 설정 필요
                const response = await fetch('http://localhost:8000/members/');
                console.log(response, "RESPONSE")
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMember(data.member);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMember();
    }, []);

    if (loading) {
        return <Main title="Member Page" description="멤버의 페이지 입니다."><p>Loading...</p></Main>;
    }

    if (error) {
        return <Main title="Member Page" description="멤버의 페이지 입니다."><p>Error: {error}</p></Main>;
    }

    return (
        <Main title="Member Page" description="멤버의 페이지 입니다.">
            <div>
                {member ? (
                    <div>
                        <h2>{member.nickname}'s Profile</h2>
                        <p>Email: {member.email}</p>
                        <p>Nickname: {member.nickname}</p>
                        {/* 기타 멤버 정보 표시 */}
                        <div>
                            <h3>Posts</h3>
                            {member.posts.map(post => (
                                <div key={post.title}>
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>
                                    {/* 기타 포스트 정보 */}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Member not found.</p>
                )}
            </div>
        </Main>
    );
};

export default Member;
