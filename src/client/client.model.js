import { Schema, model } from "mongoose";

const clientSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "No se puede exceder los 25 caracteres"]
    },

    surname:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [25, "No se puede exceder los 25 caracteres"]
    },

    email:{
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },

    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },

    businessName:{
        type: String,
        required: [true, "El nombre de su negocio es requerido"],
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

export default model("Client", clientSchema)