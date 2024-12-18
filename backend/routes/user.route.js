import express from "express";
import User from "../models/user.model.js";
const router = express.Router();
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth.js";



router.get("/me" , verifyToken , async(req  , res)=>{
  const userId =req.userId;

  try {
    const user = await User.findById(userId).select("-password");

    if(!user) {
      res.status(400).json({message: "User not found"});
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong !" });
  }
})


router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last Name  is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password length more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      //check email already exist or not before register the user
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: "User already exists" });
      }
      user = new User(req.body);
      await user.save();
      // create tokenn
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      // return cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong !" });
    }
  }
);

export default router;
