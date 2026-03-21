import dotenv from "dotenv";
import express from "express";
import connectDb from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  await connectDb();
  console.log("Server is running on PORT:", PORT);
});
