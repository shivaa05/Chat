import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import UserNotSelected from "./UserNotSelected";
import UserChats from "./UserChats";
const RightSection = () => {
  const { selectedUser } = useAuthStore();
  return (
    <div className="w-full h-full relative">
      {!selectedUser ? <UserNotSelected selectedUser={selectedUser} /> : <UserChats />}
    </div>
  );
};

export default RightSection;
