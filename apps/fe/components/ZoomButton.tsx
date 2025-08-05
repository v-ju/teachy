import { PlusIcon, MinusIcon } from "lucide-react";
import { FunctionButton } from "./FunctionButton";
import { useCanvasStore, useShapeStore } from "../utils/state";
import type { ZoomComponentType } from "../utils/types";
import { centerOnManualZoom } from "../utils/helpers";



export function ZoomButton({canvasRef} : ZoomComponentType ){
    const shapes = useShapeStore((state) => state.shapes)
    const scale = useCanvasStore((state) => state.scale)
    const canvas = canvasRef!.current
    const handleZoomIn = () => {
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        centerOnManualZoom({canvas,ctx,zoomDirection:"zoomIn"})
    }

    const handleZoomOut = () => {
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        centerOnManualZoom({canvas,ctx,zoomDirection:"zoomOut"})
    }

    const handleResetZoom = () => {
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        centerOnManualZoom({canvas,ctx,zoomDirection:"reset"})
        
    }


    return <div className="flex items-center absolute bottom-20 left-4 border border-gray-300 rounded-lg bg-gray-100 ">
       <FunctionButton icon={<MinusIcon color='black'/>} title="zoom out" tool="zoomOut" onClick={handleZoomOut}/>
       <button className="text-sm px-1 cursor-pointer " title="reset zoom" onClick={handleResetZoom}>{Math.round(scale*100)}%</button>
       <FunctionButton icon={<PlusIcon color='black'/>} title="zoom in" tool="zoomIn" onClick={handleZoomIn}/> 
    </div>   
}