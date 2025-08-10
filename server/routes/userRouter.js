import express from "express"
import { checkAuth, login, signUp } from "../controller/userController.js";
import { protectedRoute } from "../middleware/auth.js";

const userRouter = express.Router();
userRouter.post('/signup',signUp)
userRouter.post('/login',login)
userRouter.get('/check',protectedRoute,checkAuth)

export default userRouter;