import axios from "axios"
import { Shape } from "../../types"


export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Load existing shapes from server
  let existingShapes: Shape[] = (await getExistingShapes(roomId)) || []

  // Camera state
  let cameraX = 0
  let cameraY = 0
  let scale = 1

  // Drawing state
  let isDrawing = false
  let startWorldX = 0
  let startWorldY = 0

  // Panning state
  let isPanning = false
  let lastMouseX = 0
  let lastMouseY = 0

  // Render function
  const render = () => {
    clearCanvas(existingShapes, canvas, ctx, cameraX, cameraY, scale)
  }

  render()

  // Sync new shapes from WebSocket
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message)
      existingShapes.push(parsedShape.shape)
      render()
    }
  }

  // MOUSE DOWN → either pan or start drawing
  canvas.addEventListener("mousedown", (e) => {
    if (e.button === 1 || e.metaKey || e.ctrlKey || e.shiftKey) {
      // Middle click or modifier → pan mode
      isPanning = true
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      return
    }

    // Otherwise start drawing
    const [wx, wy] = screenToWorld(e, canvas, cameraX, cameraY, scale)
    isDrawing = true
    startWorldX = wx
    startWorldY = wy
  })

  // MOUSE UP → finish drawing or stop panning
  canvas.addEventListener("mouseup", (e) => {
    if (isPanning) {
      isPanning = false
      return
    }

    if (isDrawing) {
      const [wx, wy] = screenToWorld(e, canvas, cameraX, cameraY, scale)
      isDrawing = false
      const shape: Shape = {
        type: "rect",
        x: startWorldX,
        y: startWorldY,
        width: wx - startWorldX,
        height: wy - startWorldY,
      }
      existingShapes.push(shape)

      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId,
        })
      )

      render()
    }
  })

  // MOUSE MOVE → handle panning or live preview
  canvas.addEventListener("mousemove", (e) => {
    if (isPanning) {
      // Dragging the camera
      const dx = (e.clientX - lastMouseX) / scale
      const dy = (e.clientY - lastMouseY) / scale
      cameraX -= dx
      cameraY -= dy
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      render()
      return
    }

    if (isDrawing) {
      // Live preview of current shape
      const [wx, wy] = screenToWorld(e, canvas, cameraX, cameraY, scale)
      render() // redraw old shapes

      ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.setLineDash([5, 5]) // dashed preview
      ctx.strokeRect(
        (startWorldX - cameraX) * scale,
        (startWorldY - cameraY) * scale,
        (wx - startWorldX) * scale,
        (wy - startWorldY) * scale
      )
      ctx.setLineDash([]) // reset dash
    }
  })

  // SCROLL / TRACKPAD → pan or zoom
  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault()

      if (e.ctrlKey) {
        // Pinch gesture → ZOOM
        const zoomSpeed = 1.1
        const rect = canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Get world coords under cursor BEFORE zoom
        const worldMouseX = mouseX / scale + cameraX
        const worldMouseY = mouseY / scale + cameraY

        if (e.deltaY < 0) scale *= zoomSpeed // zoom in
        else scale /= zoomSpeed // zoom out

        // Keep world point under cursor stable
        cameraX = worldMouseX - mouseX / scale
        cameraY = worldMouseY - mouseY / scale
      } else {
        // Normal scroll / two-finger swipe → PAN
        cameraX += e.deltaX / scale
        cameraY += e.deltaY / scale
      }

      render()
    },
    { passive: false }
  )
}

// ========================
// HELPERS
// ========================

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  cameraX: number,
  cameraY: number,
  scale: number
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  existingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "white"
      ctx.strokeRect(
        (shape.x - cameraX) * scale,
        (shape.y - cameraY) * scale,
        shape.width * scale,
        shape.height * scale
      )
    }
  })
}

function screenToWorld(
  e: MouseEvent,
  canvas: HTMLCanvasElement,
  cameraX: number,
  cameraY: number,
  scale: number
): [number, number] {
  const rect = canvas.getBoundingClientRect()
  const sx = e.clientX - rect.left
  const sy = e.clientY - rect.top
  return [sx / scale + cameraX, sy / scale + cameraY]
}

async function getExistingShapes(roomId: string) {
  try {
    const res = await axios.get(`http://localhost:3001/dashboard/${roomId}`)
    const messages = res.data.messages

    const shapes = messages.map((x: { message: string }) => {
      const shapeData = JSON.parse(x.message)
      return shapeData.shape
    })

    return shapes
  } catch (err) {
    console.log(err)
    return []
  }
}
