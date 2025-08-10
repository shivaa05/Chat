import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
        
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const subscribeToMessages = async () => {
    if(!socket) return

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true
        setMessages((prevMessages)=>[...prevMessages,newMessage])
        axios.put(`/api/messages/mark/${newMessage._id}`)
      } else {
        setUnseenMessages((preUnseenMessages) => ({
          ...preUnseenMessages,[newMessage.senderId]:preUnseenMessages[newMessage.senderId] ? preUnseenMessages[newMessage.senderId]+1:1
        }))
      }
    })
  }

  const unsubscribeMessages = async () => {
    if(socket) socket.off("newMessage")
  }

  useEffect(() => {
    subscribeToMessages();
    return ()=>unsubscribeMessages()
  }, [])

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // If chat with this user is open
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        axios.put(`/api/messages/mark/${newMessage._id}`);
      }
      // If chat with another user is open
      else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  
 

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,     /////////////////////////////
    setMessages,
    sendMessage,
    setselectedUser,
    unseenMessages,
    setUnseenMessages
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
