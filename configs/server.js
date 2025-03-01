"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { hash } from "argon2"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import adminRoutes from "../src/admin/admin.routes.js"
import Admin from "../src/admin/admin.model.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/GestionESDB-2023292/v1/auth", authRoutes)
    app.use("/GestionESDB-2023292/v1/admin", adminRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
        createAdmin()
        createUserTest()
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}

export const createAdmin = async() => {
    try {
        const adminExists = await Admin.findOne({ role: "ADMIN" })
        
        if (!adminExists) {
            const encryptedPassword = await hash("q1w2E@3004")
            
            const newAdmin = new Admin({
                name: "Fernando Emanuel",
                surname: "Morente Lopez",
                username: "adminOne",
                email: "fmorente@gmail.com",
                phone: "45789632",
                password: encryptedPassword,
            })

            await Admin.create(newAdmin)
    
            console.log("Admin creado con éxito")
        } else {
            console.log("Ya existe un admin en la base de datos")
        }
    } catch (err) {
        console.error("Error al crear el admin:", err)
    }
}

export const createUserTest = async() => {
    try {
        const userExists = await Admin.findOne({
            $or: [{ username: "testUser" }, { email: "testuser@gmail.com" }]
        })

        if (!userExists) {
            const encryptedPassword = await hash("Test@1234")
            
            const newUser = new Admin({
                name: "Usuario",
                surname: "De Prueba",
                username: "testUser",
                email: "testuser@gmail.com",
                phone: "12345678",
                password: encryptedPassword,
                role: "TEST_USER"
            })

            await Admin.create(newUser)
    
            console.log("Usuario de prueba creado con éxito")
        } else {
            console.log("El usuario de prueba ya existe")
        }
    } catch (err) {
        console.error("Error al crear el usuario de prueba:", err)
    }
}
