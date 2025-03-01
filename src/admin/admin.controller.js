import Company from "../company/company.model.js"
import ExcelJS from "exceljs"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const formCompany = async (req, res) => {
    try {
        const data = req.body;

        const company = await Company.create(data)
        
        return res.status(201).json({
            message: "La compañia ha sido creada exitosamente",
            company: company.name
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar la compañia",
            error: err.message
        })
    }
}

export const getCompanies = async (req, res) => {
    try {
        const { limite = 5, desde = 0, categoria, ordenarPor = 'name', orden = 'asc' } = req.query
        const query = { status: true }

        if (categoria) {
            query.category = categoria
        }

        const sortCriteria = ordenarPor === 'yearsOfExperience'
            ? { foundationDate: orden === 'asc' ? 1 : -1 }
            : { name: orden === 'asc' ? 1 : -1 }

        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .sort(sortCriteria)
                .select('name category foundationDate impactLevel')
        ])

        const companiesWithExperience = companies.map(company => ({
            ...company.toObject(),
            yearsOfExperience: company.calculateYearsOfExperience()
        }))

        return res.status(200).json({
            success: true,
            total,
            companies: companiesWithExperience
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params
        const { ...data } = req.body

        const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true })

        return res.status(200).json({
            success: true,
            message: "Compañia actualizada correctamente",
            company: updatedCompany
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la compañia",
            error: error.message
        })
    }
}

export const generateCompaniesReport = async (req, res) => {
    try {
        const companies = await Company.find({ status: true })

        companies.sort((a, b) => b.calculateYearsOfExperience() - a.calculateYearsOfExperience())

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Compañías")

        worksheet.columns = [
            { header: "ID", key: "_id", width: 30 },
            { header: "Nombre", key: "name", width: 25 },
            { header: "Nivel de Impacto", key: "impactLevel", width: 20 },
            { header: "Fecha de Fundación", key: "foundationDate", width: 15 },
            { header: "Categoría", key: "category", width: 15 },
            { header: "Años de Experiencia", key: "yearsOfExperience", width: 15 }
        ]

        companies.forEach(company => {
            worksheet.addRow({
                _id: company._id,
                name: company.name,
                impactLevel: company.impactLevel,
                foundationDate: company.foundationDate.toISOString().split('T')[0],
                category: company.category,
                yearsOfExperience: company.calculateYearsOfExperience()
            })
        })

        const rootPath = path.resolve(__dirname, "../../")
        const reportsDir = path.join(rootPath, "reports", "companies")
        const filePath = path.join(reportsDir, "Companies.xlsx")

        await fs.promises.mkdir(reportsDir, { recursive: true })

        await workbook.xlsx.writeFile(filePath)

        res.status(200).json({
            success: true,
            message: "Reporte generado exitosamente",
            downloadUrl: "/reports/companies/Companies.xlsx"
        })
    } catch (err) {
        console.error("Error generando el reporte:", err)
        res.status(500).json({
            success: false,
            message: "Error al generar el reporte",
            error: err.message
        })
    }
}