import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const ProfileContainer = () => {
  const {selectedUser} = useContext(ChatContext)
  return (
    <div className="profile-container">
      <div className="top">
        <img src={selectedUser.profilePic} alt="profile" className="profile-pic" />
        <div className="name">{selectedUser.name}</div>
        <p className="bio">Hey there, I'm using Quick-Chat</p>
        <hr />
      </div>
      <div className="media">
        
      </div>
    </div>
  )
}

export default ProfileContainer
