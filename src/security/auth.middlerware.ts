import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {



    const authHeader = req.headers.authorization;
    // "Bearer hjkfsssshjhej.hrlrgfhwyrtfiwurifyqifgdchnbh"




    if (!authHeader) {
        return res.status(401).json({ message: "UTILIZADOR NAO AUTENTICADO" });

    }

    const token = authHeader.split(" ")[1];
//["Bearer", "hjkfsssshjhej.hrlrgfhwyrtfiwurifyqifgdchnbh"]

    try {
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string)
        
        next()

}catch (error) {
        return res.status(401).json({ message: "TOKEN INVALIDo" })
    }
}
/*
req: {
    headers: {
        authorization: "Bearer hjkfsssshjhej.hrlrgfhwyrtfiwurifyqifgdchnbh"
    }
} 
*/