import {hash , compare, genSalt } from "bcrypt"

export async function hashpassword(passordEmTexto:string) {
    return await hash(passordEmTexto,12)
}

export async function comparePassword(passwordEmTexto: string, passwordHash: string) {
    return await compare(passwordEmTexto,passwordHash)
    
}
