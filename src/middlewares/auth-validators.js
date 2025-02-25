import { body, param } from "express-validator"
import { nameCompanyExists, emailClientExists, businessNameClientExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { hasRoles } from "./validate-roles.js"

export const registerCompanyValidator = [
    body("name").custom(nameCompanyExists),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("yearsOfExperience").notEmpty().withMessage("Los años que la empresa ha estado en el mercado es requerido"),
    body("category").notEmpty().withMessage("La categoria de la empresa es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const registerClientValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("surname").notEmpty().withMessage("El apellido es requerido"),
    body("email").custom(emailClientExists),
    body("phone").notEmpty().withMessage("El numero de telefono es requerido"),
    body("businessName").custom(businessNameClientExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginAdminValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]