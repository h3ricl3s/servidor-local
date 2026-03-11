import mysql from"mysql2/promise"

const db = mysql.createPool({
    host:"locahost",
    user: "root",
    password:"webpass2334!",
    database: "servidor_local"
})
export default db