
import { Tool } from "../component/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type:"pencil";
    points:{x:number,y:number}[]
}

export class Game{
    private canvas:HTMLCanvasElement
    private ctx:CanvasRenderingContext2D
    private existingShapes:Shape[]
    private roomId:string
    private clicked:boolean
    private startX=0;
    private startY=0;
    private selectedTool:Tool="circle"
    private currentPencilPoints:{x:number,y:number}[]=[]
    socket:WebSocket
    constructor(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
        this.canvas=canvas;
        const ctx=canvas.getContext("2d")
        if(!ctx){
            throw new Error("Canvas context not supported")
        }
        this.ctx=ctx;
        this.existingShapes=[];
        this.roomId=roomId;
        this.socket=socket
        this.clicked=false;
    
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }
    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }
    
    setTool(tool:"circle"|"pencil"|"rect"){
        this.selectedTool=tool
    }
    async init(){
        this.existingShapes=await getExistingShapes(this.roomId);
        this.clearCanvas()
        

    }
    initHandlers(){
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type == "chat") {
                let parsedShape;
                if (typeof message.message === "string") {
                    parsedShape = JSON.parse(message.message);
                } else {
                    parsedShape = message.message;
                }
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        }
    }
    clearCanvas(){
       this. ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       this. ctx.fillStyle = "rgba(0, 0, 0)"
       this. ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShapes.map((shape) => {
            if (shape.type === "rect") {
               this. ctx.strokeStyle = "rgba(255, 255, 255)"
               this. ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                const radius=
               this. ctx.beginPath();
                
               this. ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
               this. ctx.stroke();
               this. ctx.closePath();                
            } else if (shape.type === "pencil") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.beginPath();
                for (let i = 1; i < shape.points.length; i++) {
                    const prev = shape.points[i - 1];
                    const curr = shape.points[i];
                    this.ctx.moveTo(prev.x, prev.y);
                    this.ctx.lineTo(curr.x, curr.y);
                }
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })

    }
    mouseDownHandler = (e:MouseEvent) => {
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY

        if(this.selectedTool==="pencil"){
            this.currentPencilPoints=[{x:e.clientX,y:e.clientY}]
        }
    }
    mouseUpHandler = (e:MouseEvent) => {
        this.clicked = false
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;

        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {

            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius,
            }
        } else if(selectedTool==="pencil"){
            if (this.currentPencilPoints.length > 1) {
                shape = {
                    type: "pencil",
                    points: [...this.currentPencilPoints],
                };
            }
            this.currentPencilPoints = [];
        }

        if (!shape) {
            return;
        }

        this.existingShapes.push(shape);

        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))
    }
     mouseMoveHandler = (e:MouseEvent) => {

        if(!this.clicked)return;

        if (this.selectedTool === "pencil") {
            this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });
            this.clearCanvas();

           
            this.ctx.strokeStyle = "rgba(255,255,255)";
            this.ctx.beginPath();
            for (let i = 1; i < this.currentPencilPoints.length; i++) {
                const prev = this.currentPencilPoints[i - 1];
                const curr = this.currentPencilPoints[i];
                this.ctx.moveTo(prev.x, prev.y);
                this.ctx.lineTo(curr.x, curr.y);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
        else{
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255, 255, 255)"
            const selectedTool = this.selectedTool;
            console.log(selectedTool)
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);   
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
                
                this.ctx.stroke();
                this.ctx.closePath();                
            }
        }
    }

    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)      
    }
}