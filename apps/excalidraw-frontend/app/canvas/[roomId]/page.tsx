

import { CanvasProtectedRoute } from "@/app/component/CanvasProtectedRoute";
import { RoomCanvas } from "@/app/component/RoomCanvas"

interface PageProps {
  params: {
    roomId: string;
  };
}


export default function CanvasPage({params}:PageProps){
    
    const slug=params.roomId
    
    return (
      <CanvasProtectedRoute slug={slug}>
        <RoomCanvas roomId={slug}/>
      </CanvasProtectedRoute>
    )
    
}