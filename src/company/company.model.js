import { Schema, model } from "mongoose";

const companySchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "No se puede exceder los 25 caracteres"]
    },

    impactLevel:{
        type: String,
        required: [true, "El nivel de impacto es requerido"],
        maxLength: [70, "No se puede exceder los 70 caracteres"]
    },

    yearsOfExperience:{
        type: Number,
        required: [true, "Los años que la empresa ha estado en el mercado es requerido"],
    },

    category:{
        type: String,
        required: [true, "La categoria de la empresa es requerida"],
        unique: true
    },

    status:{
        type: Boolean,
        default: true
    }
},

{
    versionKey: false,
    timestamps: true
})

export default model("Company", companySchema)