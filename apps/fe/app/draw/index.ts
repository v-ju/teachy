import { useScaleStore,useCanvasStore } from "../../state"



export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.addEventListener("wheel",  (e) => {
    e.preventDefault()
    if(e.ctrlKey || e.metaKey){

      const prevScale = useScaleStore.getState().scale

      //on key press, deltaY store the amount of zoom
      const zoomAmount = -e.deltaY * 0.001
      const newZoom = Math.min(Math.max(0.1, prevScale + zoomAmount),5)

      //change the origin to calculate the mouse point from where zoom begins
      const mouseX = e.clientX - canvas.width / 2
      const mouseY = e.clientY - canvas.height / 2

      const {cameraX, cameraY} = useCanvasStore.getState()

      //world coords calculated with old zoom, to gauge original postion in world
      const worldXb = mouseX / prevScale + cameraX
      const worldYb = mouseY / prevScale + cameraY

      //calculate world coords with new zoom value
      const worldX = mouseX / newZoom + cameraX
      const worldY = mouseY / newZoom + cameraY

      //update scale to newZoom value
      useScaleStore.getState().setScale(newZoom)

      const newCameraX = cameraX + (worldXb - worldX)
      const newCameraY = cameraY + (worldYb - worldY)

      useCanvasStore.getState().setCamera(newCameraX,newCameraY )
    }else {
      const {scale} = useScaleStore.getState()
      const {cameraX, cameraY, setCamera} = useCanvasStore.getState()
      const newWorldPanX = cameraX + e.deltaX / scale
      const newWorldPanY = cameraY + e.deltaY / scale
      setCamera(newWorldPanX, newWorldPanY)
    }

  })



}
 

function shapeMouseEvents(canvas:HTMLCanvasElement){
  canvas.addEventListener("mousedown",(e) => {})
  canvas.addEventListener("mousemove", (e) => {})
  canvas.addEventListener("mouseup", (e) => { })
}