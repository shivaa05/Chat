import Message from "../model/message.js";
import User from "../model/User.js";
import { io,userSocketMap } from "../server.js";
// Get all user Except the logged in
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // count number of messages
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const message = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (message.length > 0) {
        unseenMessages[user._id] = message.length;
      }
    });
    await Promise.all(promises);
    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all message for selected user

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUser } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUser },
        { senderId: selectedUser, receiverId: myId },
      ],
    });
    await Message.updateMany(
      {
        senderId: selectedUser,
        receiverId: myId,
      },
      { seen: true }
    );
    res.send({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// mark message as seen

export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Send Message to selected user


export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    const newMessage = await Message.create({
      receiverId,
      senderId,
      text
    })

    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    res.json({ success: true,newMessage })

  } catch (error) {
     console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}