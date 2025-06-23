import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { Axis3D } from "lucide-react";


export async function  getRoomIdFromSlug(slug:string) {

    const res=await axios.get(`${HTTP_BACKEND}/room/${slug}`)
    console.log(res);
    return res.data.room?.id;
    
}
export async function getExistingShapes(roomSlug: string) {

    const roomId=await getRoomIdFromSlug(roomSlug)
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}