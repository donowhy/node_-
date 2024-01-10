// // Messages.js
// import React from 'react'
//
// const Messages = ({ messages, currentUser }) => {
//
//     let renderMessage = (message) => {
//         console.log(message);
//         const { sender, msg, time } = message;
//         console.log(sender, msg, time, " Messages")
//         const messageFromMe = currentUser.username === message.sender;
//         const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
//         return (
//             <li className={className}>
//
//                 <div className="Message-content">
//                     <div className="username">
//                         {sender}
//                     </div>
//                     <div className="text">{msg} {time.toLocaleString()}</div>
//                 </div>
//             </li>
//         );
//     };
//
//     return (
//         <ul className="messages-list">
//             {messages.map(msg => renderMessage(msg))}
//         </ul>
//     )
// }
//
// export default Messages
