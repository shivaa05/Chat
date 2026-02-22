import { Image, Send } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const MessageSend = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, selectedUserId, getChatsByUserId } = useChatStore();
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    await sendMessage(trimmedMessage, selectedUserId);
    setMessage("");
  };

  return (
    <div className="absolute w-full bottom-0 px-11">
      <form
        className="h-12 border border-slate-900 flex gap-2 items-center rounded-full bg-gray-950 ps-5"
        onSubmit={sendMessageHandler}
      >
        <div className="flex flex-1 gap-2 py-2">
          <div>
            <Image />
          </div>
          <input
            type="text"
            placeholder="Send message"
            className="flex-1 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex gap-2 rounded-r-full cursor-pointer items-center px-3 text-lg h-full bg-sky-950">
          <Send className="size-4" />
          Send
        </div>
      </form>
    </div>
  );
};

export default MessageSend;
