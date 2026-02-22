import { getReceiverSocketId, io } from "../lib/socket.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const myId = req.userId;
    const { receiverId } = req.params;
    const { message } = req.body;
    const sender = await User.findById(myId);
    const receiver = await User.findById(receiverId);

    if (!receiver || !sender) {
      return res.status(400).json({
        success: false,
        message: "Sender or receiver is missing",
      });
    }

    const newMessage = await Chat.create({
      receiverId,
      senderId: myId,
      message,
    });

    const receiverSocketId = await getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      message: "Message sent!",
      newMessage,
    });
  } catch (error) {
    console.log("Error in sending message", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const unsendMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { msgId } = req.params;
    if (!msgId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Operation" });
    }
    
    const msg = await Chat.findById(msgId);
    if (msg.senderId != userId) return res.status(401).json({
      success: false,
      message:"Unauthorized"
    })
    return res.status(200).json({
      success: true,
      message: "Message deleted"
    })
  } catch (error) {
    console.log("Error in deleting message", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.userId;
    const messages = await Chat.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    let chatPartnersId = [];
    messages.map((msg) => {
      if (!chatPartnersId.includes(msg.senderId.toString()))
        chatPartnersId.push(msg.senderId.toString());
      if (!chatPartnersId.includes(msg.receiverId.toString()))
        chatPartnersId.push(msg.receiverId.toString());
    });
    chatPartnersId = chatPartnersId.filter((id) => id != loggedInUserId);
    const chatPartners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");

    res.status(200).json({ success: true, chatPartners });
  } catch (error) {
    console.log("Error in getAllChatPartners controllers", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getChatsByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const { id: otherUserId } = req.params;

    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("Error in getting chat controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
