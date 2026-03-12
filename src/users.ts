import db from "./lib/db.js"

export async function getUsers() {
    const [rows] = await db.execute("SELECT * FROM Tabela_utilizadores")

    console.log(rows)


    return rows

}
export async function getUserByid(id: string) {
    const [rows] = await db.execute(
        `SELECT * FROM tabela_utilizadores
        WHERE tabela_utilizadores.id =? `,
        [id]

    )
    if (Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null
}

// get date now
