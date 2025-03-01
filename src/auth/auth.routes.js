import { Router } from "express"
import { loginAdmin } from "./auth.controller.js"
import { loginAdminValidator } from "../middlewares/auth-validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación
 */

/**
 * @swagger
 * /loginAdmin:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 information:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */
router.post(
    "/loginAdmin",
    loginAdminValidator,
    loginAdmin
)

export default router