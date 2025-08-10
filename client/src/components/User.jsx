import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
const User = ({ id, name, profilePic }) => {
  const { setselectedUser, unseenMessages,setUnseenMessages } = useContext(ChatContext);
  const { onlineUser } = useContext(AuthContext);

  const handlerFunction = (e) => {
    setselectedUser({ _id: id, id, name, profilePic });
    setUnseenMessages(prev=>({...prev,[id]:0}))
  };

  return (
    <div className="user" id={id} onClick={handlerFunction}>
      <img src={profilePic} alt="profile" className="profile-pic" />
      <div className="name-and-active">
        <h3 className="name">{name}</h3>
        {onlineUser.includes(id) ? (
          <p className="active-status online" style={{ color: "green" }}>
            Online
          </p>
        ) : (
          <p className="active-status">Ofline</p>
        )}
      </div>
      {unseenMessages[id]>0 && <span className="msgCnt">{unseenMessages[id]}</span>}
    </div>
  );
};

export default User;
