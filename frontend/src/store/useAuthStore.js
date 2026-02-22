import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"
const baseUrl = "http://localhost:3000/api";
const BASE_URL = "http://localhost:3000";
export const useAuthStore = create((set,get) => ({
  authUser: null,
  allUsers: null,
  selectedUser: null,
  socket:null,
  onlineUsers: [],

  signupFunction: async (username, password, email) => {
    console.log("Usename", username);
    console.log("password", password);
    console.log("email", email);
    try {
      const res = await axios.post(
        `${baseUrl}/auth/signup`,
        { username, password, email },
        { withCredentials: true },
      );
      console.log("Signup: ", res);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in signup:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  },

  signinFunction: async (username, email, password, signinWith) => {
    try {
      const payload = {};
      payload["password"] = password;
      if (signinWith === "username") {
        payload["username"] = username;
      } else {
        payload["email"] = email;
      }
      const res = await axios.post(`${baseUrl}/auth/signin`, payload, {
        withCredentials: true,
      });
      console.log("signin", res);
      toast.success(res.data.message);
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("Error in signin", error.response.data.message);
      toast.error(error.response.data.message);
    }
  },

  signoutFunction: async () => {
    try {
      await axios.get(`${baseUrl}/auth/signout`, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logged out succesfully!");
    } catch (error) {
      console.log("Error in logged out", error);
    }
  },

  getAuthUser: async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/get-auth-user`, {
        withCredentials: true,
      });
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log("error in getAuthUser", error);
    }
  },

  getAllUsers: async () => {
    try {
      const res = await axios(`${baseUrl}/auth/get-all-users`, {
        withCredentials: true,
      });
      set({ allUsers: res.data.users });
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  },

  getUserById: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/auth/get-user-by-id/${id}`, {
        withCredentials: true,
      });
      set({ selectedUser: res.data.user });
      console.log("Selected user", res.data.user);
    } catch (error) {
      console.log("Error in getting user");
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, // this ensures cookies are sent with the connection
    });

    socket.connect();

    set({ socket });
    
    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    console.log("get().onlineUsers")
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
