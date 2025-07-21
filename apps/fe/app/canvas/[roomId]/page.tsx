"use client"
import { useEffect, useRef } from "react"
import { initDraw } from "../../draw";





export default function Canvas(){
    //To interact with the canvas you need to get the "context" of the canvas, so use useEffect,useRef to get the reference of the canvas

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect( () => {
        if (canvasRef.current){
            
            initDraw(canvasRef.current)


        }
    }, [canvasRef])

    
    return <div className="">
        <canvas ref={canvasRef} width={2000} height={1000} className="border" />
    </div>
}