import React, { useState, useEffect } from 'react';
import Main from "../../components/section/Main";
import { useNavigate } from "react-router-dom";

const Member = () => {
    const [members, setMembers] = useState(null); // 상태 설정 함수 이름 오타 수정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // 함수 이름을 좀 더 일반적인 형태로 수정

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                if (!accessToken) {
                    console.error('No access token available');
                    navigate('/'); // navigateFunction을 navigate로 변경
                    setLoading(false);
                    return;
                }
                const response = await fetch('http://localhost:8000/members', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data, "DATA");
                setMembers(data.members); // 상태 설정 함수 이름 오타 수정
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMember();
    }, [navigate]); // useEffect 의존성 배열에 navigate 추가

    if (loading) {
        return <Main title="Member Page" description="멤버의 페이지 입니다."><p>Loading...</p></Main>;
    }

    if (error) {
        return <Main title="Member Page" description="멤버의 페이지 입니다."><p>Error: {error}</p></Main>;
    }

    // 멤버 상세 페이지로 이동하는 함수
    // const goToMemberDetail = (memberId) => {
    //     navigate(`/members/detail/${memberId}`);
    // };

    const handleLinkTo = (memberId) => {
        return () => navigate(`/members/detail/${memberId}`);
    }

    return (
        <Main title="Member Page" description="멤버의 페이지 입니다.">
            <div className= 'memberPage'>
                {loading && <p className='loading'>Loading...</p>}
                {error && <p className='errorMessage'>Error: {error}</p>}
                {!loading && !error && members && (
                    <ul className='memberList'>
                        {members.map((member, index) => (
                            <li key={index} className='memberItem' onClick={handleLinkTo(member.id)} >
                                <h2>
                                    {member.nickname}'s Profile
                                </h2>
                                <p >
                                    {member.login_id}
                                </p>
                                <p>{member.nickname}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {!loading && !error && !members && <p className='noMembers'>Member not found.</p>}
            </div>
        </Main>
    );
};

export default Member;
