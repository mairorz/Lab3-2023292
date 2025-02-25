import Company from "../company/company.model.js"
import Client from "../client/client.model.js"

export const nameCompanyExists = async (name = "") => {
    const exist = await Company.findOne({name})
    if(exist){
        throw new Error(`EL nombre ${email} esta en uso`)
    }
}

export const emailClientExists = async (email = "") => {
    const exist = await Client.findOne({email})
    if(exist){
        throw new Error(`EL email ${email} ya se esta registrado`)
    }
}

export const businessNameClientExists = async (businessName = "") => {
    const exist = await Client.findOne({businessName})
    if(exist){
        throw new Error(`El nombre ${businessName} esta en uso`)
    }
}