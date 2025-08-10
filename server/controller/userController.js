import User from "../model/User.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";


// Sign up

export const signUp = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    if (!email || !fullname || !password) {
    return res.json({success:false,message:"Missing details"})
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({success:false,message:"User already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      fullname, password: hashedPassword, email
    });
    
    const token = generateToken(newUser._id)

    res.json({success:true,userData:newUser,token,message:"Account created Succesfully"})
  } catch (e) {
    console.log(e);
    res.json({success:false,message:e.message})
  }
}

// Login 
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({success:false,message:"Missing details"})
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({success:false,message:"User doesn't exist"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    
    if (!isPasswordCorrect) {
      return res.json({success:false,message:"Invalid credentials"})
    }

    const token = generateToken(user._id)
    res.json({success:true,userData:user,token,message:"Login successfull"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//  controller to check if user is authentecated

export const checkAuth = (req,res) => {
  res.json({success:true,user:req.user})
}