import { Router } from "express"
import { loginAdmin } from "./auth.controller.js"
import { loginAdminValidator } from "../middlewares/auth-validators.js"

const router = Router()

router.post(
    "/loginAdmin",
    loginAdminValidator,
    loginAdmin
)

export default router