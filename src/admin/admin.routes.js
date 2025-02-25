import { Router } from "express"
import { formCompany, formClient } from "./admin.controller.js"
import { formCompanyValidator, formClientValidator } from "../middlewares/admin-validators.js"

const router = Router()

router.post(
    "/registerCompany", 
    formCompanyValidator, 
    formCompany
)

router.post(
    "/registerClient", 
    formClientValidator, 
    formClient
)

export default router