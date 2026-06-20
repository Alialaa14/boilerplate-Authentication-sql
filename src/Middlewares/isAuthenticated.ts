import { type Response, type NextFunction } from "express";
import ApiError from "../helpers/ApiError.js";
import jwt from "jsonwebtoken";
import { ENV } from "../helpers/ENV.js";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id =
      req.cookies?.accessToken ||
      (req.headers?.authorization.startsWith("Bearer") &&
        req.headers.authorization.split("_")[1]);

    if (!id) {
      return next(new ApiError("User not authenticated", 401));
    }

    const user = jwt.verify(id, ENV.ACCESS_TOKEN_SECRET);
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return next(new ApiError("Error authenticating user", 500));
  }
};
