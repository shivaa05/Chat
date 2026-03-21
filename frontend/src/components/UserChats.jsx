import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import MessageSend from "./MessageSend";
import { useChatStore } from "../store/useChatStore";

const UserChats = () => {
  const { selectedUser, onlineUsers } = useAuthStore();
  const {
    currentUserMessages,
    selectedUserId,
    subscribeToMessages,
    getChatsByUserId,
    unsendeMessage,
  } = useChatStore();

  const UTCtoIST = (UTCtime) => {
    const time = new Date(UTCtime).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return time;
  };

  // const messageRightClickHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   console.log(e.target.id);
  // };

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentUserMessages]);

  useEffect(() => {
    getChatsByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    //  return () => unsubscribeFromMessages();
  }, [selectedUserId, subscribeToMessages]);

  return (
    <div className="h-full overflow-hidden">
      {/* Header */}
      <div className="sticky flex items-center gap-3 top-0 left-0 border-b py-2 px-4 bg-slate-950/50 z-100 backdrop-blur-lg">
        <div className="size-12 rounded-full border bg-zinc-700 text-2xl flex justify-center items-center">
          {selectedUser.profileImage ? (
            <img src={selectedUser.profileImage} className="size-12 rounded-full object-cover"/>
          ) : (
            selectedUser?.username[0].toUpperCase()
          )}
        </div>
        <div className="flex flex-col text-lg">
          <div>{selectedUser?.username}</div>
          {onlineUsers.includes(selectedUser?._id) ? (
            <div className="text-sm text-green-500 -mt-0.5">Online</div>
          ) : (
            <div className="text-sm text-zinc-400 -mt-0.5">Offline</div>
          )}
        </div>
      </div>

      {/* Chats */}
      <div className="h-full pb-30 overflow-y-scroll px-15 flex flex-col w-full gap-2 pt-20">
        {currentUserMessages.map((message) => (
          <div
            className={`${message.senderId == selectedUserId ? "" : "justify-end"} flex relative`}
            key={message._id}
          >
            <div className="relative p-3 rounded-xl max-w-xs bg-slate-900 flex flex-col min-w-24">
              <div
                className="pb-2"
                // onContextMenu={messageRightClickHandler}
                id={message._id}
              >
                {message.message}{" "}
              </div>
              {message.senderId !== selectedUserId ? (
                <div className="absolute -right-1.5 top-1 w-0 h-0 border-t-8 border-b-10 border-t-transparent border-b-transparent border-l-10 border-l-slate-900"></div>
              ) : (
                <div className="absolute -left-1.5 top-1 w-0 h-0 border-t-8 border-b-10 border-t-transparent border-b-transparent border-r-10 border-r-slate-900"></div>
              )}
              <div className="text-xs text-zinc-400 absolute bottom-0.5 right-2">
                {UTCtoIST(message.createdAt)}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      {/* Input box */}
      <MessageSend />
    </div>
  );
};

export default UserChats;
