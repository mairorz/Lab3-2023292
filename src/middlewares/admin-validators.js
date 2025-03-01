import { body, param } from "express-validator"
import { nameCompanyExists, companiesExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { hasRoles } from "./validate-roles.js"
import { validateJWT } from "./validate-jwt.js"

export const formCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").custom(nameCompanyExists),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("foundationDate").notEmpty().withMessage("El año en el que se fundo la empresa o compañia es requerido"),
    body("category").notEmpty().withMessage("La categoria de la empresa es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const listCompaniesValidator = [
    validateJWT,
    hasRoles("ADMIN")
]

export const updateCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("id").isMongoId().withMessage("No es un ID valido de MongoDB"),
    param("id").custom(companiesExists),
    validarCampos,
    handleErrors
]