import Company from "../company/company.model.js"

export const nameCompanyExists = async (name = "") => {
    const exist = await Company.findOne({name})
    if(exist){
        throw new Error(`EL nombre ${name} esta en uso`)
    }
}