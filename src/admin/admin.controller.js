import Company from "../company/company.model.js"

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