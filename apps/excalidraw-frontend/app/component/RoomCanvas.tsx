
"use client";

import { WS_URL } from "@/config";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";
import { ClipLoader } from "react-spinners";


export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {

        const token=typeof window !=="undefined"?localStorage.getItem("token"):null;
        if(!token)
            return 
        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type:"join_room",
                roomId
            });
            
            ws.send(data)
        }
        
    }, [])
   
    if (!socket) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <ClipLoader size={40} color="#36d7b7" />
            </div>
        );
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}