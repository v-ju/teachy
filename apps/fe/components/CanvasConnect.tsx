"use client"
import { useRef,useEffect, useState } from "react";
import { initDraw } from "../app/draw";

export function CanvasConnect({roomId} : {roomId : string}){
    //To interact with the canvas you need to get the "context" of the canvas, so use useEffect,useRef to get the reference of the canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);   

    useEffect( () => {
        if (canvasRef.current){
            initDraw(canvasRef.current, roomId)
        }
    }, [canvasRef])

    return <div className="">
        <canvas ref={canvasRef} width={2000} height={1000} className="border" />
    </div>
}