import nodemailer from "nodemailer";
import { ENV } from "../helpers/ENV.ts";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL,
    pass: ENV.EMAIL_PASSWORD,
  },
});
console.log(transporter);

export default transporter;
