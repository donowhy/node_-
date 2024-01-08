import React, { useState, useEffect } from 'react';
import Main from "../../components/section/Main";
import base64 from "base-64";
import {useNavigate} from "react-router-dom";

const PostRegister = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');  // Added dynamic title state
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [tags, setTags] = useState([]);
    const navigateFunction = useNavigate();
    // Fetch the user ID from the token when the component mounts
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const accessToken = localStorage.getItem('login-token');
                if (!accessToken) {
                    console.error('No access token available');
                    navigateFunction('/')
                    return;
                }
                let payload = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
                let decoded = base64.decode(payload);
                const decodedObject = JSON.parse(decoded);

                // id 값 추출
                const id = decodedObject.id;

                const response = await fetch('http://localhost:8000/posts', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    setMemberId(id);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    const [memberId, setMemberId] = useState(null);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTagsChange = (e) => {
        const tagArray = e.target.value.split(',').map((tag) => tag.trim());
        setTags(tagArray);
    };

    const handlePostRegister = async () => {
        try {
            const accessToken = localStorage.getItem('login-token');
            console.log(tags);
            const response = await fetch('http://localhost:8000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    member_member_id: memberId,
                    tags,
                }),
            });

            if (response.ok) {
                setRegistrationStatus('success');
            } else {
                setRegistrationStatus('error');
            }
        } catch (error) {
            console.error('Error registering post:', error);
            setRegistrationStatus('error');
        }
    };

    return (
        <Main>
            <div>
                <h2>Post Register</h2>
                <label>
                    Content:
                    <input type="text" value={content} onChange={handleContentChange}/>
                </label>

                <br/>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange}/>
                </label>
                <br/>
                <label>
                    Tags (comma-separated):
                    <input type="text" value={tags.join(', ')} onChange={handleTagsChange}/>
                </label>
                <br/>
                <button onClick={handlePostRegister}>Register Post</button>

                {registrationStatus === 'success' && (
                    <p style={{color: 'green'}}>Post registered successfully!</p>
                )}
                {registrationStatus === 'error' && (
                    <p style={{color: 'red'}}>Failed to register post. Please try again.</p>
                )}
            </div>
        </Main>
    );
};

export default PostRegister;
