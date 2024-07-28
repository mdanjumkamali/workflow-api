import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models/user/user.model";

// Sign up

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const validateEmail = await User.findOne({ email });
    if (validateEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPass,
    });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = await Jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("authToken", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "User logged in successfully", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
