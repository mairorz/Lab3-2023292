import Client from "../client/client.model.js"
import Company from "../company/company.model.js"

export const formCompany = async (req, res) => {
    try {
        const data = req.body;

        const company = await Company.create(data);

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

export const formClient = async (req, res) => {
    try {
        const data = req.body;

        const client = await Client.create(data);

        return res.status(201).json({
            message: "El cliente ha sido registrado correctamente",
            client: client.name,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar el cliente",
            error: err.message
        })
    }
}