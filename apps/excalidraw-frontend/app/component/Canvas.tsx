import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { initDraw } from "../draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./icon";
import { Game } from "../draw/Game";


export type Tool="circle"|"rect"|"pencil"
export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    console.log(roomId);

    const [game,setGame]=useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")


    useEffect(()=>{
        game?.setTool(selectedTool)
    },[selectedTool,game])

    useEffect(() => {
    if (!canvasRef.current) return;

    const g = new Game(canvasRef.current, roomId, socket);
    setGame(g);

    return () => {
        g.destroy();
    };
    }, []);

    return <div style={{
        height:"100vh",
        overflow:"hidden",
        background:"black"

    }}>
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
}


function Topbar({selectedTool,setSelectedTool}:{
    selectedTool:Tool,
    setSelectedTool:(s:Tool)=>void
}){
    return <div style={{
        position:"fixed",
        top:20,
        left:"50%",
        transform:"translateX(-50%)",
        zIndex:10
    }}>
        <div className="flex gap-t">
            <IconButton 
                    onClick={() => {
                        setSelectedTool("pencil")
                    }}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton onClick={() => {
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} ></IconButton>
                <IconButton onClick={() => {
                    setSelectedTool("circle")
                }} activated={selectedTool === "circle"} icon={<Circle />}></IconButton>
        </div>
        

    </div>
}

