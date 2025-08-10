import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import {io} from "socket.io-client"


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

  const [token,setToken] = useState(localStorage.getItem("token"))
  const [authUser,setAuthUser] = useState(null)
  const [onlineUser,setOnlineUser] = useState([])
  const [socket,setSocket] = useState(null)
  

  // check if the user is authentecated
  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth/check')
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Login function

  const login = async (state, credentials)=>{
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData)
        connectSocket(data.userData)
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token)
        localStorage.setItem("token",data.token)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      
      toast.error(error.message)
    }
  }

  // logout function
  const logout = async () => {
    localStorage.removeItem("token")
    setToken(null)
    setAuthUser(null)
    setOnlineUser([])
    axios.defaults.headers.common["token"] = null
    toast.success("Logged out succesfully")
    socket.disconnect()
  }

  //Connect socket function to handle socket connection and online users updates

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      }
    });
    newSocket.connect();
    setSocket(newSocket);

      newSocket.on("getOnlineUsers", (userIds)=>{
        setOnlineUser(userIds);
        
      })
  }

  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth()
  },[])

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
    login,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
