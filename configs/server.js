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
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"] 
    }))
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"]
            },
        },
    }))
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/GestionESDB-2023292/v1/auth", authRoutes)
    app.use("/GestionESDB-2023292/v1/admin", adminRoutes)
    app.use("/GestionESDB-2023292/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
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
        createAdmins()
        createUserTest()
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}

export const createAdmins = async () => {
    try {
        const admins = [
            { name: "Fernando Emanuel", surname: "Morente Lopez", username: "adminOne", email: "fmorente@gmail.com", phone: "45789632", password: "Pass123!" },
            { name: "María Alejandra", surname: "Gómez Pérez", username: "adminTwo", email: "mgomez@gmail.com", phone: "12345678", password: "Alejandra456@" },
            { name: "Carlos Eduardo", surname: "Ramírez Torres", username: "adminThree", email: "cramirez@gmail.com", phone: "87654321", password: "Carlos789#" },
            { name: "Laura Sofía", surname: "Mendoza Ruiz", username: "adminFour", email: "lmendoza@gmail.com", phone: "11223344", password: "LauraSofia123$" },
            { name: "Jorge Luis", surname: "Fernández Castillo", username: "adminFive", email: "jfernandez@gmail.com", phone: "55667788", password: "Jorge456&" },
            { name: "Valentina", surname: "Martínez López", username: "adminSix", email: "vmartinez@gmail.com", phone: "66778899", password: "Valentina789*" },
            { name: "David Sebastián", surname: "Ortega Vázquez", username: "adminSeven", email: "dortega@gmail.com", phone: "99887766", password: "David321!" },
            { name: "Andrea Paola", surname: "Hernández Chávez", username: "adminEight", email: "ahernandez@gmail.com", phone: "22334455", password: "Andrea654@" },
            { name: "Ricardo Daniel", surname: "Pérez Núñez", username: "adminNine", email: "rperez@gmail.com", phone: "33445566", password: "Ricardo987#" },
            { name: "Gabriela Fernanda", surname: "Rojas Díaz", username: "adminTen", email: "grojas@gmail.com", phone: "44556677", password: "Gabriela852$" }
        ]

        for (const adminData of admins) {
            const adminExists = await Admin.findOne({ $or: [{ username: adminData.username }, { email: adminData.email }] })

            if (!adminExists) {
                const encryptedPassword = await hash(adminData.password, 10)

                const newAdmin = new Admin({
                    ...adminData,
                    password: encryptedPassword,
                    role: "ADMIN"
                })

                await newAdmin.save()
                console.log(`Admin ${adminData.username} creado con éxito`)
            } else {
                console.log(`El admin ${adminData.username} ya existe en la base de datos`)
            }
        }
    } catch (err) {
        console.error("Error al crear los admins:", err)
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
