import { create } from "@/controllers/user"
import { validate } from "@/middleware/validator"
import { Router } from "express"
import { CreateUserSchema } from "@/utils/validationSchema"

const router = Router()

router.post("/create", validate(CreateUserSchema), create)

export default router