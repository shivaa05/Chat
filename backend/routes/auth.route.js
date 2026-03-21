import express from "express";
import {
  getAllFriends,
  getAllUsers,
  getAuthUser,
  getUserById,
  getUserByUsername,
  signin,
  signout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.post("/update-profile", isAuth,upload.single("profileImage"), updateProfile);
router.get("/get-user-by-id/:id", getUserById);
router.get("/get-user-by-username/:username", getUserByUsername);
router.get("/get-all-friends", isAuth, getAllFriends);
router.get("/get-auth-user", isAuth, getAuthUser);
router.get("/get-all-users", isAuth, getAllUsers);

export default router;
