"use client"
import { useRef,useEffect, useState} from "react";
import { initDraw } from "../app/draw";
import { ToolBar } from "./CanvasToolBar";
import { Sidebar } from "./CanvasSidebar";
import { Tools } from "../state";
import { ZoomButton } from "./ZoomButton";
import { Redo } from "./UndoRedo";
import { Theme } from "./Theme";

export function RoomCanvas({roomId,socket} : {roomId : string, socket: WebSocket}){
    //To interact with the canvas you need to get the "context" of the canvas, so use useEffect,useRef to get the reference of the canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);   
    

    useEffect( () => {
        if (canvasRef.current){
            initDraw(canvasRef.current, roomId, socket)
        }
    }, [])

    return <div className="relative">

        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />

        
        <ToolBar />   
        
        
        
        <Sidebar/>
       

        
        <ZoomButton/>
        

        
        <Redo/>
        

        <Theme/>

    </div>
}