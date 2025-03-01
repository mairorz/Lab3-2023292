import { verify } from "argon2"
import Admin from "../admin/admin.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const loginAdmin = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const admin = await Admin.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!admin){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo del admin ingresado"
            })
        }

        const validPassword = await verify(admin.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(admin.id)

        return res.status(200).json({
            message: "Se logeo de manera exitosa",
            information: {
                user: admin.username,
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "Error al logearse, error en el servidor",
            error: err.message
        })
    }
}