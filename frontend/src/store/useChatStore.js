import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const baseUrl = "http://localhost:3000/api";
export const useChatStore = create((set, get) => ({
  allChatPartners: null,
  currentUserMessages: [],
  isLoadingMessages: false,
  selectedUserId: null,

  getAllChatPartners: async () => {
    try {
      const res = await axios.get(`${baseUrl}/chat/chatpartners`, {
        withCredentials: true,
      });
      set({ allChatPartners: res.data.chatPartners });
    } catch (error) {
      console.log("Error in gettin all chat partners", error);
    }
  },

  getChatsByUserId: async (id) => {
    set({ isLoadingMessages: true });
    try {
      const res = await axios.get(`${baseUrl}/chat/getchats-user/${id}`, {
        withCredentials: true,
      });
      set({ currentUserMessages: res.data.messages });
      set({ selectedUserId: id });
      console.log(res.data.messages);
    } catch (error) {
      console.log("Error in getting chat", error);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (message, id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/chat/send/${id}`,
        { message },
        { withCredentials: true },
      );

      set((state) => ({
        currentUserMessages: [
          ...state.currentUserMessages,
          res.data.newMessage,
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  },

  subscribeToMessages: () => {
    console.log("Subscribing");
    const { selectedUserId } = get();
    if (!selectedUserId) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUserId;
      if (!isMessageSentFromSelectedUser) return;

      get().getChatsByUserId(selectedUserId);
      // const currentMessages = get().currentUserMessages;
      // console.log(currentMessages)
      // set({ currentUserMessages: [...currentMessages, newMessage] });
    });
  },

  unsendMessage: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/chat/unsend/${id}`, {
        withCredentials: true,
      });
      console.log(res)
    } catch (error) {
      console.log("Error in deleting", error);
    }
  },
}));
