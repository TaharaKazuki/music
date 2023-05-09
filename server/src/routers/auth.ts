import { create, verifyEmail } from "@/controllers/user"
import { validate } from "@/middleware/validator"
import { Router } from "express"
import {
  CreateUserSchema,
  EmailVerificationBody,
} from "@/utils/validationSchema"

const router = Router()

router.post("/create", validate(CreateUserSchema), create)
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail)

export default router
