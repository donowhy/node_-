import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Main from "../components/section/Main";
import base64 from 'base-64';


const MyPage = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    // URL 파라미터를 읽어오기 위해 useParams 훅 사용
    const { id } = useParams();

    useEffect(() => {
        const fetchMember = async () => {
            try {
                // localStorage에서 login-token 가져오기
                const accessToken = localStorage.getItem('login-token');

                // 토큰이 없으면 로그인 페이지로 리다이렉트 또는 다른 처리를 하세요.
                if (!accessToken) {
                    console.error('No access token available');
                    setLoading(false);
                    return;
                }

                let payload = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
                let decoded = base64.decode(payload);
                const decodedObject = JSON.parse(decoded);

                // id 값 추출
                const id = decodedObject.id;

                console.log("decode", decoded);
                // 여기에 실제로 사용되는 백엔드 API의 엔드포인트를 적어주세요.
                const response = await fetch(`http://localhost:8000/members/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();

                // 서버로부터 받은 멤버 데이터를 state에 설정
                setMember(data.member);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member data:', error);
                setLoading(false);
            }
        };

        // fetchMember 함수 호출
        fetchMember();
    }, [id]); // id가 변경될 때마다 useEffect 실행

    return (
        <Main title="My Page" description="나의 페이지입니다.">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* 멤버 데이터를 활용한 내용 표시 */}
                    <p>Member ID: {member.login_id}</p>
                    <p>Email: {member.email}</p>
                    {/* 필요한 다른 정보들도 추가로 표시 */}
                </div>
            )}
        </Main>
    );
};

export default MyPage;
