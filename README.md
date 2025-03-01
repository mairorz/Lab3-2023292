# 📌 Proyecto de Gestión de Administradores y Autenticación

Este programa cuenta con **10 administradores predefinidos** al iniciar el sistema. Además, estos administradores están almacenados en la carpeta `data` para su gestión.

## 🔐 Autenticación

Para realizar cualquier acción en el sistema, como el registro de nuevas empresas o consultas, es **obligatorio** utilizar la autenticación con un token. Esto se hace a través de **Postman**, configurando el **Authorization** con el tipo **Bearer Token** y proporcionando el token generado al iniciar sesión.

## 👥 Administradores Predefinidos

Estos son los administradores cargados automáticamente al iniciar el sistema:

| Nombre | Apellido | Usuario | Email | Teléfono | Contraseña |
|--------|---------|---------|-------|----------|------------|
| Fernando Emanuel | Morente Lopez | adminOne | fmorente@gmail.com | 45789632 | Pass123! |
| María Alejandra | Gómez Pérez | adminTwo | mgomez@gmail.com | 12345678 | Alejandra456@ |
| Carlos Eduardo | Ramírez Torres | adminThree | cramirez@gmail.com | 87654321 | Carlos789# |
| Laura Sofía | Mendoza Ruiz | adminFour | lmendoza@gmail.com | 11223344 | LauraSofia123$ |
| Jorge Luis | Fernández Castillo | adminFive | jfernandez@gmail.com | 55667788 | Jorge456& |
| Valentina | Martínez López | adminSix | vmartinez@gmail.com | 66778899 | Valentina789* |
| David Sebastián | Ortega Vázquez | adminSeven | dortega@gmail.com | 99887766 | David321! |
| Andrea Paola | Hernández Chávez | adminEight | ahernandez@gmail.com | 22334455 | Andrea654@ |
| Ricardo Daniel | Pérez Núñez | adminNine | rperez@gmail.com | 33445566 | Ricardo987# |
| Gabriela Fernanda | Rojas Díaz | adminTen | grojas@gmail.com | 44556677 | Gabriela852$ |

## 🚀 Uso del Programa

1️⃣ **Iniciar sesión** con uno de los administradores utilizando su `email` y `password`.
2️⃣ **Obtener el token** de autenticación.
3️⃣ **Configurar Postman:**
   - En la pestaña **Authorization**, seleccionar `Bearer Token`.
   - Ingresar el token obtenido.
4️⃣ **Realizar operaciones** como registrar, visualizar o modificar datos.

## 🛠 Tecnologías Usadas
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT (JSON Web Token) para autenticación**

📌 **Nota:** Asegúrate de proteger la información sensible y cambiar las contraseñas en producción.
