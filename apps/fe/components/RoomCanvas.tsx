"use client"
import { useRef,useEffect} from "react";
import { initDraw } from "../app/draw";

export function RoomCanvas({roomId,socket} : {roomId : string, socket: WebSocket}){
    //To interact with the canvas you need to get the "context" of the canvas, so use useEffect,useRef to get the reference of the canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);   

    useEffect( () => {
        if (canvasRef.current){
            initDraw(canvasRef.current, roomId, socket)
        }
    }, [canvasRef])

    return <div className="">
        <canvas ref={canvasRef} width={2000} height={800} />
    </div>
}