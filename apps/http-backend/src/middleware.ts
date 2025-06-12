import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { isArrayTypeNode } from "typescript";


export function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"No token provided"})
        return;
    }
    
    const token=authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: number };

        //@ts-ignore
        req.userId=decoded.userId;
        next();
    }catch (e) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
}