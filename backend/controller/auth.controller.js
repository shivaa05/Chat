import mongoose from "mongoose";
import generateToken from "../lib/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!isValidEmail)
      return res.status(400).json({
        success: false,
        message: "Enter a valid email",
      });

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (!email && !username) {
      return res.status(400).json({
        success: false,
        message: "Email or username is required",
      });
    }

    let user;
    if (username) {
      user = await User.findOne({ username });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = await generateToken(user._id);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.log("Error in signin controller:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in signout controller:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in getUserById controller:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in getUserByUsername controller:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate(
      "friends",
      "username profileImage",
    );
    return res.status(200).json({
      success: true,
      friends: user.friends,
    });
  } catch (error) {
    console.log("Error in getAllfriends controller:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAuthUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getAuth User:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.userId
    let users = await User.find();
    users = users.filter((user)=>user._id!=userId)
    return res.status(200).json({users})
  } catch (error) {
    console.log("Error in getAllUsers,", error);
    return res.status(500).json({
      success: false,
      message:"Internal server error"
    })
  }
}