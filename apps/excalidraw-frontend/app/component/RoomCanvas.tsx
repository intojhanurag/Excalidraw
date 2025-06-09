
"use client";

import { WS_URL } from "@/config";
import { initDraw } from "../draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";


export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDMyMWFjNi1lZmZjLTQxMmUtYWVlMy04OThlZmI3MGM5YjgiLCJpYXQiOjE3NDg1NDI0NDh9.sF3ZwAdLZPM6w-RiSiRB6ocuT2OEfjip7UqWU14PgsE`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type:"join_room",
                roomId
            });
            console.log(data);
            ws.send(data)
        }
        
    }, [])
   
    if (!socket) {
        return <div>
            Connecting to server....
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}