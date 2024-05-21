import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser,selectedUser} = useSelector(store=>store.user);
  // when user send a new msg then the scrollbar goes up automatically like in real whatsapp
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"});
  },[message])
  const formattedTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div  ref={scroll} className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"}`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src={message.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
      </div>
    </div>
    <div className="chat-header">
      <time className="text-xs opacity-80 text-black">{formattedTime(message.createdAt)}</time>
    </div>
    <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''} `}>{message?.message}</div>
   
  </div>
  )
}

export default Message