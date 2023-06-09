import nodemailer from "nodemailer"
import path from "path"
import User from "@/models/user"
import EmailVerificationToken from "@/models/emailVerificationToken"
import {
  MAILTRAP_USER,
  MAILTRAP_PASS,
  VERIFICATION_EMAIL,
} from "@/utils/variables"
import { generateToken } from "@/utils/helper"
import { generateTemplate } from "@/mail/template"

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  })

  return transport
}

type Profile = {
  name: string
  email: string
  userId: string
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTransporter()

  const { name, email } = profile

  const welcomeMessage = `Hi ${name}, welcome to Music! There are so much 
thing that we do for verified users. Use the given OTP to verify your email.`

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Welcome message",
    html: generateTemplate({
      title: "Welcome to Music",
      message: welcomeMessage,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "#",
      btnTitle: token,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../mail/welcome.png"),
        cid: "welcome",
      },
    ],
  })
}
