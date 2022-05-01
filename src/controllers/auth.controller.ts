import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
// import user from "../models/user";

export const signUp = async (req: Request, res: Response) => {
  // creating user
  const { username, email, password } = req.body;
  const user: IUser = new User({ username, email, password });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();

  //token
  const token: string = jwt.sign(
    { _id: savedUser._id },
    process.env.TOKEN_SECRET || "4N07H3RT0K3N"
  );

  res.header("auth-token", token).json(savedUser);
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("Invalid email or password");

  const isValidPassword: boolean = await user.validatePassword(password);
  if (isValidPassword) return res.status(400).json("Invalid Password");

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "4N07H3RT0K3N",
    { expiresIn: 60 * 60 * 24 }
  );

  res.header("auth-token", token).json(user);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(400).json("No User found");

  res.json(user);
};
