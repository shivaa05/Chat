import express from "express"
import isAuth from "../middleware/isAuth.js";
import {getAllChatPartners, getChatsByUserId, sendMessage, unsendMessage } from "../controller/chat.controller.js";

const router = express.Router();

router.post("/send/:receiverId", isAuth, sendMessage);
router.get("/unsend/:msgId", isAuth, unsendMessage);
router.get("/chatpartners", isAuth, getAllChatPartners);
router.get("/getchats-user/:id", isAuth, getChatsByUserId);

export default router;