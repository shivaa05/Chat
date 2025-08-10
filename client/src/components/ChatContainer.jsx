import React, { useContext, useEffect, useRef, useState } from "react";
import data from "../../dummyData/data";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const [inputMessage, setInputMessage] = useState("");

  const { selectedUser, sendMessage, getMessages, messages,setselectedUser } = useContext(ChatContext);

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const hanldeSendMessage = async (e) => {
    if (e.key === "Enter") {
      if(inputMessage.trim()==="") return
      await sendMessage({ text: inputMessage.trim() });
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  const handleClickBack = () => {
    setselectedUser(null);
    
  }
  return (
    <div className={`chat-container ${!selectedUser && "hidden"}`}>
      <div className="chat-header">
        <img
          src={selectedUser.profilePic}
          alt="profile"
          className="header-profile-pic"
        />
        <div className="header-username">{selectedUser.name}</div>
        <img src={assets.arrow_icon} alt="back" className="back" onClick={handleClickBack}/>
      </div>

      <div className="chat">
        {messages.map((msg) => {

          return (
            <p className={`messages ${selectedUser._id===msg.receiverId?"sent":"received"}`} key={msg._id}>
              <span className="message">
                {msg.text} <span className="time">7:00 AM</span>
              </span>
              <img src={assets.avatar_icon} alt="user" className="image" />
            </p>
          );
        })}
        <div ref={messagesEndRef}/>
      </div>

      <div className="bottom">
        <div className="input-container">
          <input
            type="text"
            className="bottom-input"
            placeholder="Send a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={hanldeSendMessage}
          />
          <input type="file" id="file" hidden />
          <label htmlFor="file" className="gallery-container">
            <img src={assets.gallery_icon} alt="" className="gallery" />
          </label>
        </div>
        <button className="send">
          <img src={assets.send_button} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
