import jwt from "jsonwebtoken"
import User from "../model/User.js"

// middleware

export const protectedRoute = async(req,res,next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }
    req.user = user;
    next()
  } catch (error) {
    console.log(error.message);
    res.json({status:false,message:error.message})
  }
}