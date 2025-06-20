

import { CanvasProtectedRoute } from "@/app/component/CanvasProtectedRoute";
import { RoomCanvas } from "@/app/component/RoomCanvas"

interface PageProps {
  params: {
    roomId: string;
  };
}


export default async  function CanvasPage({params}:PageProps){
    
    const {roomId}=await params
    
    return (
      <CanvasProtectedRoute slug={roomId}>
        <RoomCanvas roomId={roomId}/>
      </CanvasProtectedRoute>
    )
    
}