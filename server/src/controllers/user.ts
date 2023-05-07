import { RequestHandler } from "express"
import { CreateUser } from "@/types/user"
import nodemailer from "nodemailer"
import path from "path"
import User from "@/models/user"
import EmailVerificationToken from "@/models/emailVerificationToken"
import { MAILTRAP_USER, MAILTRAP_PASS } from "@/utils/variables"
import { generateToken } from "@/utils/helper"
import { generateTemplate } from "@/mail/template"

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body

  const user = await User.create({ name, email, password })

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  })

  const token = generateToken()

  await EmailVerificationToken.create({
    owner: user._id,
    token,
  })

  const welcomeMessage = `Hi ${name}, welcome to Music! There are so much 
  thing that we do for verified users. Use the given OTP to verify your email.`

  transport.sendMail({
    to: user.email,
    from: "auth@myapp.com",
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

  res.status(201).json({ user })
}
