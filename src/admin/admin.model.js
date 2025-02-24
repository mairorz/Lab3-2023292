import { Schema, model } from "mongoose";

const adminSchema = Schema({
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

    username:{
        type: String,
        required: true,
        unique:true
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

    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },

    role:{
        type: String,
        required: true,
        default: "ADMIN"
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

userSchema.methods.toJSON = function(){
    const {password, _id, ...admin} = this.toObject()
    admin.uid = _id
    return user
}

export default model("Admin", adminSchema)