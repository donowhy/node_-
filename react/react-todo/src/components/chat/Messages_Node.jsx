// import React from 'react'
//
// const Messages_Node = ({ messages, currentUser }) => {
//
//     const time = new Date();
//
//     const renderMessage = (message) => {
//         console.log(message, "MESSAGE");
//         const { member, msg } = message;
//         const messageFromMe = currentUser === member;
//         const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
//
//         return (
//             <li className={className}>
//                 <div className="Message-content">
//                     <div className="username">
//                         {member}
//                     </div>
//                     <div className="text">{msg} </div>
//                     <div> {time.toLocaleString()}</div>
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
// export default Messages_Node;