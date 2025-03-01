import { Router } from "express"
import { formCompany, getCompanies } from "./admin.controller.js"
import { formCompanyValidator, listCompaniesValidator } from "../middlewares/admin-validators.js"

const router = Router()

router.post(
    "/registerCompany", 
    formCompanyValidator, 
    formCompany
)

router.get(
    "/listCompanies", 
    listCompaniesValidator,
    getCompanies
    
)

export default router