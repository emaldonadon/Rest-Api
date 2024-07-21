import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "juantext"
})

pool.query('SELECT 1')
    .then(() => console.log("Conexion establecida"))
    .catch((error) => {
        console.log(error)
    })
pool.on("error", (error) => {
    console.log(error)
})