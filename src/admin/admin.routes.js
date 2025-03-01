import { Router } from "express"
import { formCompany, getCompanies, updateCompany } from "./admin.controller.js"
import { formCompanyValidator, listCompaniesValidator, updateCompanyValidator } from "../middlewares/admin-validators.js"

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

router.patch(
    "/updateCompany/:id", 
    updateCompanyValidator, 
    updateCompany
)

export default router