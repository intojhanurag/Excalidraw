

import { CanvasProtectedRoute } from "@/app/component/CanvasProtectedRoute";
import { RoomCanvas } from "@/app/component/RoomCanvas"

interface PageProps {
  params: {
    roomId: string;
  };
}


export default function CanvasPage({params}:PageProps){
    
    const roomId=params.roomId
    
    return (
      <CanvasProtectedRoute roomId={roomId}>
        <RoomCanvas roomId={roomId}/>
      </CanvasProtectedRoute>
    )
    
}