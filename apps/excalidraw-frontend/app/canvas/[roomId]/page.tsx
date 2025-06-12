

import { RoomCanvas } from "@/app/component/RoomCanvas"


export default function CanvasPage({params}:{
    params:{
        roomId:string
    }
}){
    const roomId=(params).roomId
    
    return <RoomCanvas roomId={roomId}/>
    
}