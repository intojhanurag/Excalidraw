
import { initDraw } from "@/app/draw"
import { useEffect, useRef } from "react"
import { RoomCanvas } from "@/app/component/RoomCanvas"


export default async function CanvasPage({params}:{
    params:{
        roomId:string
    }
}){
    const roomId=(await params).roomId
    console.log(roomId)

    return <RoomCanvas roomId={roomId}/>
    
}