import { body, param } from "express-validator"
import { nameCompanyExists, emailClientExists, businessNameClientExists } from "../helpers/db-validators.js"
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
    body("yearsOfExperience").notEmpty().withMessage("Los años que la empresa ha estado en el mercado es requerido"),
    body("category").notEmpty().withMessage("La categoria de la empresa es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const formClientValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("surname").notEmpty().withMessage("El apellido es requerido"),
    body("email").custom(emailClientExists),
    body("phone").notEmpty().withMessage("El numero de telefono es requerido"),
    body("businessName").custom(businessNameClientExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]