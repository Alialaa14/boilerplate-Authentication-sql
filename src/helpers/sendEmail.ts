import transporter from "../utils/emailTransporter.ts";
import { ENV } from "./ENV.ts";
import ApiResponse from "./ApiResponse.ts";
import ApiError from "./ApiError.ts";
import { type Request, type Response, type NextFunction } from "express";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      transporter
        .sendMail({
          from: ENV.EMAIL,
          to,
          subject,
          text,
          html,
        })
        .then(() => {
          return res
            .status(200)
            .json(new ApiResponse(true, "Email sent successfully", null));
        })
        .catch((error) => {
          console.log(error);
          return next(new ApiError("Error sending email", 500));
        });
    } catch (error) {
      console.log(error);
      return next(new ApiError("Error sending email", 500));
    }
  };
};
