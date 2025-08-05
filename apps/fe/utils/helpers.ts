import { useCanvasStore, useShapeStore, useStyleStore, useToolStore } from "./state"
import { Shape, ToolEventHandlers } from "./types"
import {nanoid} from 'nanoid'

export function screenToWorldCoords(e: MouseEvent, canvas: HTMLCanvasElement, cameraX: number, cameraY: number, scale:number): [number, number]{
  const shapeBounds = canvas.getBoundingClientRect()
  const screenCoordX = e.clientX - shapeBounds.left
  const screenCoordY = e.clientY - shapeBounds.top

  const worldShapeCoordX = cameraX + screenCoordX / scale
  const worldShapeCoordY = cameraY + screenCoordY / scale

  return [worldShapeCoordX, worldShapeCoordY]
}

export function drawShape(ctx: CanvasRenderingContext2D, draftShape:Shape){
  
  if(draftShape.type === "rect"){
    const { cameraX, cameraY, scale } = useCanvasStore.getState()

    const screenX = (draftShape.x - cameraX) * scale
    const screenY = (draftShape.y - cameraY) * scale
    const screenWidth = draftShape.width * scale
    const screenHeight = draftShape.height * scale

    ctx.strokeStyle= draftShape.strokeColor
    ctx.lineWidth = draftShape.strokeWidth
    ctx.fillStyle = draftShape.fillColor;

    if(draftShape.strokeStyle === "solid") {
      ctx.setLineDash([])
    }else if (draftShape.strokeStyle === "dashed"){
      ctx.setLineDash([10, 5])
    }else if (draftShape.strokeStyle === "dotted"){
      ctx.setLineDash([2, 4]) 
    }
    
    ctx.beginPath();
    ctx.rect(screenX,screenY,screenWidth, screenHeight)
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export function clearCanvas(shapes:Shape[],canvas: HTMLCanvasElement, ctx:CanvasRenderingContext2D){

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  console.log(shapes)
  shapes.map((shape) => {
    drawShape(ctx,shape)
  })
}

function normalizeRect(x1: number, y1: number, x2: number, y2: number) {
  const x = Math.min(x1, x2)
  const y = Math.min(y1, y2)
  const width = Math.abs(x2 - x1)
  const height = Math.abs(y2 - y1)
  return { x, y, width, height }
}

export function drawRect():ToolEventHandlers {

  let isDrawing = false
  let isPanning = false
  let mouseX = 0
  let mouseY = 0
  let shapeStartWorldX = 0
  let shapeStartWorldY = 0
  let draftShape: Shape

  return {
    onMouseDown(e, canvas){
      console.log("mousedown triggered")
      if(e!.metaKey || e!.ctrlKey){
        isPanning = true
        mouseX = e.clientX 
        mouseY = e.clientY 
        return
      }
    
      isDrawing = true
      const scale = useCanvasStore.getState().scale
      const {cameraX, cameraY} = useCanvasStore.getState()
      const [worldShapeCoordX, worldShapeCoordY] = screenToWorldCoords(e,canvas,cameraX,cameraY,scale)
      shapeStartWorldX = worldShapeCoordX
      shapeStartWorldY = worldShapeCoordY
    },

    onMouseMove(e,canvas,ctx){
      
      if (!isDrawing && !isPanning) return;
      console.log("mousemove triggered")
      const { cameraX, cameraY } = useCanvasStore.getState()
      const {scale} = useCanvasStore.getState()

      if (isPanning){
        console.log("ispanning mousemove triggered")
        const dx = (e.clientX - mouseX) / scale
        const dy = (e.clientY - mouseY) / scale
        useCanvasStore.getState().setCamera(cameraX - dx, cameraY - dy)
        const shapes = useShapeStore.getState().shapes
        clearCanvas(shapes,canvas,ctx)
        mouseX = e.clientX
        mouseY = e.clientY
        
        return
      } 

      if(isDrawing){
        console.log("isdrawing mousemove triggered")
        const [worldShapeCoordX, worldShapeCoordY] = screenToWorldCoords(e, canvas, cameraX, cameraY, scale)
        const shapes = useShapeStore.getState().shapes
        clearCanvas(shapes,canvas,ctx)
        const currentTool = useToolStore.getState().currentTool
        console.log(currentTool)
        const { strokeColor, fillColor, strokeStyle, strokeWidth } = useStyleStore.getState()

        const { x, y, width, height } = normalizeRect(
          shapeStartWorldX,
          shapeStartWorldY,
          worldShapeCoordX,
          worldShapeCoordY
        )

        draftShape = {
          id: nanoid(6),
          type : "rect",
          x,
          y,
          width,
          height,
          strokeStyle,
          strokeWidth,
          strokeColor,
          fillColor
        }  

        drawShape(ctx,draftShape)
          
      }
    },

    onMouseUp(e,canvas,ctx){
      console.log("mouseup triggered")

      isPanning = false
      isDrawing = false
      useShapeStore.getState().addShape(draftShape)
      const shapes = useShapeStore.getState().shapes
      clearCanvas(shapes,canvas,ctx)
      useToolStore.getState().setSelectedShapeId(draftShape.id)
      useToolStore.getState().setTool("selector")
      
    }
  }
}

export function zoomAtPoint({zoomAmount,mouseX, mouseY,canvas,ctx}:{zoomAmount:number,mouseX:number, mouseY:number, canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D}){
    const {scale:prevScale, cameraX, cameraY,setScale,setCamera} = useCanvasStore.getState()

    //on key press, deltaY store the amount of zoom
    const newZoom = Math.min(Math.max(0.1, prevScale + zoomAmount),5)
    
    //world coords calculated with old zoom, to gauge original postion in world
    const worldXb = mouseX / prevScale + cameraX
    const worldYb = mouseY / prevScale + cameraY

    //calculate world coords with new zoom value
    const worldX = mouseX / newZoom + cameraX
    const worldY = mouseY / newZoom + cameraY

    //update scale to newZoom value
    setScale(newZoom)
    //clearCanvas(existingShapes,canvas,ctx)
    const newCameraX = cameraX + (worldXb - worldX)
    const newCameraY = cameraY + (worldYb - worldY)

    setCamera(newCameraX,newCameraY)
    const shapes = useShapeStore.getState().shapes
    clearCanvas(shapes,canvas,ctx)
}

export function centerOnManualZoom({canvas,zoomDirection,ctx}:{canvas:HTMLCanvasElement,zoomDirection: "zoomIn" | "zoomOut" | "reset",ctx:CanvasRenderingContext2D}){
    const bounds = canvas.getBoundingClientRect();
    const mouseX = bounds.width / 2;
    const mouseY = bounds.height / 2;
    
    const { scale: prevScale } = useCanvasStore.getState();

    let zoomAmount = 0;

    if (zoomDirection === "zoomIn") {
        zoomAmount = 0.1; // or prevScale * 0.1 if you want it proportional
    } else if (zoomDirection === "zoomOut") {
        zoomAmount = -0.1;
    } else if (zoomDirection === "reset") {
        zoomAmount = 1 - prevScale; // This makes scale exactly 1
    }


    zoomAtPoint({
    zoomAmount,
    mouseX,
    mouseY,
    canvas,
    ctx
    });


}

export function selectShape({e}:{e:MouseEvent}){

  const mouseX = e.clientX
  const mouseY = e.clientY
}