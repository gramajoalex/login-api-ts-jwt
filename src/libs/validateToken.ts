import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access denied");

  const payload = jwt.verify(
    token,
    process.env.TOKEN_SECRET || "4N07H3RT0K3N"
  ) as IPayload;
  req.userId = payload._id;

  next();
};
