import { Circle, Pencil, RectangleHorizontalIcon,PenLine,Minus} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./icon";
import { Game } from "../draw/Game";


export type Tool="circle"|"rect"|"pencil"|"line"
export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
        minHeight:"100vh",
        overflow:"auto",
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
        zIndex:10,
        backgroundColor:"#202020",
        borderRadius:"10px"
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


                <IconButton onClick={() => {
                    setSelectedTool("line")
                }} activated={selectedTool === "line"} icon={<Minus />}></IconButton>
        </div>
        

    </div>
}

