import React, { useEffect, useState } from "react";
import { LogOut, Search, Bubbles, User, Cross, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import Profile from "./Profile";
const LeftSection = () => {
  const [selected, setSelected] = useState("chats");
  const [showProfile, setShowProfile] = useState(false);
  const { allUsers, signoutFunction, getUserById, onlineUsers } =
    useAuthStore();
  const { allChatPartners, getChatsByUserId, selectedUserId } = useChatStore();
  const [users, setUsers] = useState(allUsers);
  const [chatParteners, setChatParteners] = useState(allChatPartners);
  const [searchVal, setSearchVal] = useState("");

  const searchHandler = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (allUsers == null && selected == "allusers") return;
    if (allChatPartners == null && selected == "chats") return;
    if (val == "") {
      setUsers(allUsers);
      setChatParteners(allChatPartners);
    } else {
      let filteredUser = allUsers.filter((user) =>
        user.username.toUpperCase().includes(val.toUpperCase()),
      );
      let filteredChatParteners = chatParteners.filter((user) =>
        user.username.toUpperCase().includes(val.toUpperCase()),
      );
      setUsers(filteredUser);
      setChatParteners(filteredChatParteners);
    }
  };
  const selectUserHandler = (id) => {
    getChatsByUserId(id);
    getUserById(id);
  };

  useEffect(() => {
    setChatParteners(allChatPartners);
    setUsers(allUsers);
  }, [allChatPartners, allUsers]);
  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold bg-linear-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent">
          Chat App
        </div>
        <div className="flex gap-4 items-center">
          <div className="size-7 border flex justify-center items-center rounded-full">
            {showProfile ? (
              <X
                className="size-5 cursor-pointer"
                onClick={() => setShowProfile(false)}
              />
            ) : (
              <User
                className="size-5 cursor-pointer"
                onClick={() => setShowProfile(true)}
              />
            )}
          </div>
          <LogOut className="cursor-pointer" onClick={signoutFunction} />
        </div>
      </div>

      {showProfile ? (
        <Profile />
      ) : (
        <div>
          <div className="flex items-center gap-2 px-4 rounded-full border border-blue-300 mt-5 py-1">
            <Search className="size-4" />
            <input
              type="text"
              className="flex-1 outline-none"
              placeholder="Search for friend"
              value={searchVal}
              onChange={searchHandler}
            />
          </div>

          <div className="grid grid-cols-2 mt-3 gap-10 text-center text-lg font-semibold">
            <div
              className={`${selected == "chats" && "border-b-2 bg-linear-to-t from-slate-900/40"} p-1 cursor-pointer`}
              onClick={() => setSelected("chats")}
            >
              Chats
            </div>
            <div
              className={`${selected == "allusers" && "border-b-2 bg-linear-to-t from-slate-900/40"} p-1 cursor-pointer`}
              onClick={() => setSelected("allusers")}
            >
              AllUsers
            </div>
          </div>

          {selected == "chats" && (
            <div className="flex flex-col gap-2 pt-5 overflow-y-scroll pr-2">
              {chatParteners?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 p-2 border rounded-lg cursor-pointer bg-slate-900/80 backdrop-blur-2xl"
                  onClick={() => selectUserHandler(user._id)}
                >
                  <div className="relative">
                    <div className="size-12 rounded-full border flex justify-center items-center text-2xl bg-green-800/50">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        user.username.slice(0, 1).toUpperCase()
                      )}
                    </div>
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute size-3 bg-green-500 top-0.5 -right-0.5 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <div>{user.username}</div>
                    {onlineUsers.includes(user._id) ? (
                      <div className="text-sm text-green-500">Online</div>
                    ) : (
                      <div className="text-sm text-zinc-300">Offline</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selected == "allusers" && (
            <div className="flex flex-col gap-2 pt-5 overflow-y-scroll pr-2">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 p-2 border rounded-lg cursor-pointer bg-slate-900/80 backdrop-blur-2xl"
                  onClick={() => selectUserHandler(user._id)}
                >
                  <div className="size-12 rounded-full border flex justify-center items-center text-2xl bg-green-800/50">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      user.username.slice(0, 1).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div>{user.username}</div>
                    {onlineUsers.includes(user._id) ? (
                      <div className="text-sm text-green-500">Online</div>
                    ) : (
                      <div className="text-sm text-zinc-300">Offline</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftSection;
