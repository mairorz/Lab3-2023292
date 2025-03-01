import { Schema, model } from "mongoose";

const companySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "No se puede exceder los 25 caracteres"]
    },

    impactLevel: {
        type: String,
        required: true,
        maxLength: [70, "No se puede exceder los 70 caracteres"]
    },

    foundationDate: {
        type: Date,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: true
    }
}, 

{
    versionKey: false,
    timestamps: true
})

companySchema.methods.calculateYearsOfExperience = function() {
    const currentYear = new Date().getFullYear()
    const foundationYear = new Date(this.foundationDate).getFullYear()
    return currentYear - foundationYear
}

export default model("Company", companySchema)