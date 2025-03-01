import Company from "../company/company.model.js"

export const nameCompanyExists = async (name = "") => {
    const exist = await Company.findOne({name})
    if(exist){
        throw new Error(`EL nombre ${name} esta en uso`)
    }
}

export const companiesExists = async (id = " ") => {
    const exist = await Company.findById(id)
    if(!exist){
        throw new Error("No existe la compañia con el ID proporcionado")
    }
}