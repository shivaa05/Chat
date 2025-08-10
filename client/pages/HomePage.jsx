import React, { useContext, useEffect, useState } from "react";
import assets from "../src/assets/assets";
import User from "../src/components/User";
import data from "../dummyData/data";
import RightWhenUserNotSelected from "../src/components/RightWhenUserNotSelected";
import ChatContainer from "../src/components/ChatContainer";
import ProfileContainer from "../src/components/ProfileContainer";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


const HomePage = () => {
  const [isHovered, setIsHovered] = useState(true);
  const [inputSearch, setInputSearch] = useState("");
  const { logout,onlineUser } = useContext(AuthContext)
  
  const {users,getUsers,selectedUser} = useContext(ChatContext)

  useEffect(() => {
    getUsers()
  }, [])
  

  const menuHandler = (e) => {
    setIsHovered(!isHovered)
  }

  const logoutHandler = () => {
    logout()
  }


  const filteredUser = inputSearch ? users.filter((user)=>user.fullname.toLowerCase().includes(inputSearch.toLowerCase())):users
  return (
    <div
      className="home"
      style={{ gridTemplateColumns: selectedUser ? "1fr 2fr 1fr" : "1fr 1fr" }}
    >
      <div className={`left ${selectedUser && "bgChangeClass hidden"}`}>
        <div className="header">
          <img src={`${assets.logo}`} alt="logo" className="logo-left" />
          <div
            style={{ height: "100%" }}
            onMouseEnter={(e) => menuHandler(e)}
            onMouseLeave={(e) => menuHandler(e)}
          >
            <img src={`${assets.menu_icon}`} alt="menu" className="menu" />
            <div className={`menu-container ${isHovered && "hiddenDropDown"}`}>
              <div className="icon" style={{ borderBottom: "1px solid gray" }}>
                Edit Profile
              </div>
              <div className="icon" onClick={logoutHandler}>
                Logout
              </div>
            </div>
          </div>
        </div>

        <div className="search">
          <img
            src={`${assets.search_icon}`}
            alt="search"
            className="search-icon"
          />
          <input
            type="text"
            className="search-box"
            placeholder="search here..."
            onChange={(e)=>setInputSearch(e.target.value)}
            value={inputSearch}
            style={{color:"#fff"}}
          />
        </div>
        <div className="users">
          {filteredUser.map((user) => {
            
            return onlineUser.includes(user._id) && <User
              id={user._id}
              profilePic={assets.avatar_icon}
              name={user.fullname}
              key={Math.random()}
            />
          })}
          {filteredUser.map((user) => {
            
            return !onlineUser.includes(user._id) && <User
              id={user._id}
              profilePic={assets.avatar_icon}
              name={user.fullname}
              key={Math.random()}
            />
          })}
        </div>
      </div>

      {/* Only render if the user is not selected */}
      {!selectedUser && <RightWhenUserNotSelected />}
      {selectedUser && <ChatContainer/>}
      {selectedUser && <ProfileContainer/>}
    </div>
  );
};

export default HomePage;
