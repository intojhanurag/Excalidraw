import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt"
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

function generateRoomCode(length=8)
{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;

}

app.post("/signup", async (req, res) => {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }    
    try {
        const hashedPassword=await bcrypt.hash(parsedData.data.password,10)
       
        const user = await prismaClient.user.create({
            
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name
            }
        })
        
        res.json({
            userId: user.id
            
        })
    } catch(e) {
        
        res.status(500).json({
            message: "Signup failed",
             error: e instanceof Error ? e.message : String(e)
        });
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
           
        }
    })
   
    if (!user||!(await bcrypt.compare(parsedData.data.password,user.password))) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }

    const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET
    );

    res.json({
        token
    })
})



app.post("/create-room", middleware, async (req, res) => {
    // this will use when we create new room
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // @ts-ignore
    const userId = req.userId;

    try {
        const roomCode=generateRoomCode();
        
        
        const room = await prismaClient.room.create({
            data: {
                slug:roomCode,
                name:parsedData.data.name,
                adminId: userId,
                users:{
                    connect:{id:userId}
                },
                
            },

            include:{users:true}
        })

        res.json({
            roomId: room.id,
            slug:room.slug
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})


app.post("/room/:slug/join", middleware, async (req, res) => {

    // this will use when join other person room by roomId
    const slug = req.params.slug;
    // @ts-ignore
    const userId = req.userId;

    const room = await prismaClient.room.update({
        where: { slug },
        data: {
            users: {
                connect: { id: userId }
            }
        },
        include: { users: true }
    });

    res.json({
        message: "Joined room",
        users: room.users.length // Current user count
    });
});



app.get("/my-rooms",middleware,async(req,res)=>{

    // this will give us the all rooms in which i am the member of that room
    //@ts-ignore
    const userId=req.userId

    try{
        const rooms=await prismaClient.room.findMany({
            where:{
                users:{
                    some:{id:userId}
                }
            },
            include:{
                users:{
                    select:{id:true,name:true}
                }
            },
            orderBy:{createAt:"desc"}
        })
        

        const formattedRooms=rooms.map(room=>({
            roomId:room.id,
            slug:room.slug,
            name:room.name,
            createdAt:room.createAt.toISOString().split("T")[0],
            participants: room.users.map(u => u.id === userId ? "You" : u.name),
            noOfParticipants: room.users.length
        }))
        

        res.status(200).json({rooms:formattedRooms})
    } catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

app.get("/room/:slug", async (req, res) => {
    // this will use when we try to access the any route like /canvas/56xyz without creation of roomid\
    // then our canvasprotectedRoute file check that this room with this slug exist or not then we redirect to that particular room
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})


app.post("/leave-room", middleware, async (req, res) => {

  const { slug } = req.body;
  // @ts-ignore
  const userId = req.userId;

  try {
    // Find the room with users
    const room = await prismaClient.room.findUnique({
      where: { slug },
      include: { 
        users: {
            select: { id: true }
        }
       }
    });

    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }

    if (room?.users.length === 1 && room?.users[0]?.id === userId) {
      // Only one user (the current user), delete the room
      await prismaClient.room.delete({ where: { slug } });
      res.json({ message: "Room deleted" });
    } else {
      // More than one user, disconnect the user from the room
      await prismaClient.room.update({
        where: { slug },
        
        data: {
          users: {
            disconnect: { id: userId }
          }
        }
      });
      res.json({ message: "Left room" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/chats/:roomId", async (req, res) => {

    // this will return the all chats of the specific roomId
    try {
        const roomId = Number(req.params.roomId);
       
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch(e) {
        
        res.json({
            messages: []
        })
    }
    
})



app.listen(3001);