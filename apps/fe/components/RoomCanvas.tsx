"use client"
import { useRef,useEffect, useState} from "react";
import { initDraw } from "../app/draw";
import { ToolBar } from "./CanvasToolBar";
import { Sidebar } from "./CanvasSidebar";

enum Tools {pan = "pan",selector = "selector",rect = "rect",diamond = "diamond",circle = "circle",arrow = "arrow",line = "line",draw = "draw",text = "text",erase = "erase",image = "image"} 


export function RoomCanvas({roomId,socket} : {roomId : string, socket: WebSocket}){
    //To interact with the canvas you need to get the "context" of the canvas, so use useEffect,useRef to get the reference of the canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);   
    const [tool, setTool] = useState<Tools>(Tools.selector)

    useEffect( () => {
        if (canvasRef.current){
            initDraw(canvasRef.current, roomId, socket)
        }
    }, [])

    return <div className="relative">

        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />

        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white p-1 rounded-xl shadow-lg ">
            <ToolBar tool={tool} setTool={setTool}/>   
        </div>
        
        <div className="absolute left-4 top-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <Sidebar/>
        </div>

    </div>
}