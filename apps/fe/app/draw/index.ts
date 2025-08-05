import { clearCanvas, drawRect,zoomAtPoint } from "../../utils/helpers"
import { useCanvasStore, useShapeStore, useToolStore } from "../../utils/state"
import { ToolEventHandlers,Tools} from "../../utils/types"

const toolHandlers:Partial<Record<Tools, ToolEventHandlers>> = {
  "rect" : drawRect(), 
}


export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const shapes = useShapeStore.getState().shapes
  clearCanvas(shapes,canvas,ctx)

  canvas.addEventListener("wheel",  (e) => {
    console.log("wheel triggered")
    e.preventDefault()
    if(e.ctrlKey || e.metaKey){
      const bounds = canvas.getBoundingClientRect()
      const mouseX = e.clientX - bounds.left
      const mouseY = e.clientY - bounds.top

      zoomAtPoint({
        zoomAmount: -e.deltaY * 0.001,
        mouseX,
        mouseY,
        canvas,
        ctx
      });

    }else {
      const {scale} = useCanvasStore.getState()
      const {cameraX, cameraY, setCamera} = useCanvasStore.getState()
      const newWorldPanX = cameraX + e.deltaX / scale
      const newWorldPanY = cameraY + e.deltaY / scale
      setCamera(newWorldPanX, newWorldPanY)
      const shapes = useShapeStore.getState().shapes
      clearCanvas(shapes,canvas,ctx)
      console.log(scale,cameraX, cameraY,newWorldPanX, newWorldPanY)
    }
  },{ passive: false })

  canvas.addEventListener("mousedown", (e) => {
    const tool = useToolStore.getState().currentTool
    toolHandlers[tool]?.onMouseDown(e,canvas,ctx)
  })
   canvas.addEventListener("mousemove", (e) => {
    const tool = useToolStore.getState().currentTool
    toolHandlers[tool]?.onMouseMove(e,canvas,ctx)
  })

   canvas.addEventListener("mouseup", (e) => {
    const tool = useToolStore.getState().currentTool
    toolHandlers[tool]?.onMouseUp(e,canvas,ctx)
  })
}
 











