import { Router } from "express"
import { formCompany, getCompanies, updateCompany, generateCompaniesReport } from "./admin.controller.js"
import { formCompanyValidator, listCompaniesValidator, updateCompanyValidator } from "../middlewares/admin-validators.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rutas de administración
 */

/**
 * @swagger
 * /registerCompany:
 *   post:
 *     summary: Registrar una nueva compañía
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *               foundationDate:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente
 *       500:
 *         description: Error al registrar la compañía
 */
router.post(
    "/registerCompany", 
    formCompanyValidator, 
    formCompany
)

/**
 * @swagger
 * /listCompanies:
 *   get:
 *     summary: Listar compañías
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de compañías a listar
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Índice desde donde listar
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Categoría de las compañías
 *       - in: query
 *         name: ordenarPor
 *         schema:
 *           type: string
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: orden
 *         schema:
 *           type: string
 *         description: Orden ascendente o descendente
 *     responses:
 *       200:
 *         description: Lista de compañías
 *       500:
 *         description: Error al obtener las compañías
 */
router.get(
    "/listCompanies", 
    listCompaniesValidator,
    getCompanies
)

/**
 * @swagger
 * /updateCompany/{id}:
 *   patch:
 *     summary: Actualizar una compañía
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la compañía a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               impactLevel:
 *                 type: string
 *               foundationDate:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Compañía actualizada correctamente
 *       500:
 *         description: Error al actualizar la compañía
 */
router.patch(
    "/updateCompany/:id", 
    updateCompanyValidator, 
    updateCompany
)

/**
 * @swagger
 * /generateCompaniesReport:
 *   get:
 *     summary: Generar reporte de compañías
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *       500:
 *         description: Error al generar el reporte
 */
router.get(
    "/generateCompaniesReport", 
    listCompaniesValidator, 
    generateCompaniesReport
)

export default router