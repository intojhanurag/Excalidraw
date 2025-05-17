import { NextFunction,Request,Response } from "express";

import { JWT_SECRET } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";


interface customRequest extends Request {
  userId?: string;
}
export function middleware(req:customRequest,res:Response,next:NextFunction){

    const token=req.headers["authorization"]??""

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {userId:string} ;
        
        req.userId = decoded.userId;
        next(); 
    } catch (e) {
        res.status(403).json({ message: "Unauthorized" });
    }

}