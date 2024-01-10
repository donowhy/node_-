import React from 'react'

const Messages_Node = ({ messages, currentUser }) => {

    const renderMessage = (message) => {
        const { sender, msg, time } = message;
        const messageFromMe = currentUser === sender;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";

        return (
            <li className={className}>
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{msg} {new Date(time).toLocaleString()}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}

export default Messages_Node;