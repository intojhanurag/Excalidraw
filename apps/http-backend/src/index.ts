import express from "express"

import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { middleware } from "./middleware"
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import { Response } from "express"
import type { customRequest } from "./middleware"
import bcrypt, { hash } from "bcrypt"
const app=express()
app.use(express.json())

app.post("/signup",async(req:customRequest,res:Response)=>{

    const parsedData=CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect inputs"
        })
        return
    }

    try{
        const hashedPassowrd=await bcrypt.hash(parsedData.data.password,10)
        const user=await prismaClient.user.create({
            data:{
                email:parsedData.data?.username,
                password:hashedPassowrd,
                name:parsedData.data.name
            }
        })
        res.status(201).json({
            message:"user created successfully",
            userId:user.id
        })
    }
    catch(error){
        console.error("Error creating user:",error);
        res.status(500).json({
            message:"something went wrong"
        })
    }

})
app.post("/signin",async(req:customRequest,res:Response)=>{

    const parsedData=SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect inputs"
        })
        return
    }
    
    try{
        
        const user=await prismaClient.user.findFirst({
            where:{
                email:parsedData.data.username
            }
        })
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }
        const isPasswordCorrect=await bcrypt.compare(
            parsedData.data.password,
            user.password
        )
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Incorrect passoword"
            })
        }
        
        
        const token=jwt.sign({
        userId:user.id,

        },JWT_SECRET)

        res.json({
            token
        })
    } catch(error){
        console.error("Login error",error);
        res.status(500).json({message:"something went wrong"})
    }
    
})
// app.post("/room",middleware,async(customRequest,res)=>{

//     const data=CreateRoomSchema.safeParse(customRequest.body);
//     if(!data.success){
//         res.json({
//             message:"Incorrect inputs"
//         })
//         return
//     }
//     try{
//         const adminId=customRequest.userId;
//         const room=await prisma.room.create({
//             data:{
//                 slug:data.data.slug,
//                 adminId:adminId
//             }
//         })
//         res.status(201).json({
//         message: "Room created",
//         roomId: room.id
//         });
//     } catch (error) {
//     console.error("Error creating room:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
    
// })
app.listen(4000)