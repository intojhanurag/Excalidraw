import { Circle, Pencil, RectangleHorizontalIcon,ArrowBigRight,Minus,LogOut} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./icon";
import { Game } from "../draw/Game";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";


export type Tool="circle"|"rect"|"pencil"|"line"|"arrow"
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
    const [exitbutton,selectexistbutton]=useState(false);
    const router=useRouter();
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
                }} activated={selectedTool === "line"} icon={<Minus/>}></IconButton>

                <IconButton onClick={() => {
                    setSelectedTool("arrow")
                }} activated={selectedTool === "arrow"} icon={<ArrowBigRight />}></IconButton>

                <div     
                className={`m-2 pointer rounded-full border hover:opacity-70 p-2 bg-black cursor-pointer text-white hover:bg-gray ${exitbutton ? "bg-blue-500" : "text-white"  }` }       
                onClick={() => {   
                    router.push("/dashboard")
                }}><LogOut/></div>
        </div>
        

    </div>

}

