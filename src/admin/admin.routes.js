import { Router } from "express"
import { formCompany, getCompanies, updateCompany, generateCompaniesReport } from "./admin.controller.js"
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

router.get(
    "/generateCompaniesReport", 
    listCompaniesValidator, 
    generateCompaniesReport
)

export default router