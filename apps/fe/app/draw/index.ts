
export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Load existing shapes from server
}
 