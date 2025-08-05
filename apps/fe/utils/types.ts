import { ReactNode, RefObject } from "react"

export type Shape =
  | { id: string
    type: "rect"
    x: number
    y: number
    width: number
    height: number
    selected?: boolean
    strokeStyle: strokeStyle
    strokeWidth: strokeWidth
    strokeColor: strokeColor
    fillColor: fillColor
  } | 
  { id: string
    type: "diamond"
    x: number
    y: number
    width: number
    height: number
    selected?: boolean
    strokeStyle: strokeStyle
    strokeWidth: strokeWidth
    strokeColor: strokeColor
    fillColor: fillColor
  } | 
  { id: string
    type: "circle"
    centerX: number
    centerY: number
    radius: number
    selected?: boolean
    strokeStyle: strokeStyle
    strokeWidth: strokeWidth
    strokeColor: strokeColor
    fillColor: fillColor
  } | 
  { id: string
    type: "arrow"
    startX: number
    startY: number
    endX: number
    endY: number
    selected?: boolean
    strokeStyle: strokeStyle
    strokeWidth: strokeWidth
    strokeColor: strokeColor
    fillColor: fillColor
  } | 
  { id: string
    type: "line"
    startX: number
    startY: number
    endX: number
    endY: number
    selected?: boolean
    strokeStyle: strokeStyle
    strokeWidth: strokeWidth
    strokeColor: strokeColor
    fillColor: fillColor
  } | 
  { id: string
    type: "draw"
    coordsArray: {x:number, y:number}[]
    strokeWidth: strokeWidth
    strokeColor: strokeColor
    fillColor: fillColor
  } | 
  { id: string
    type: "text"
    x: number
    y: number
    text: string
    strokeColor: strokeColor
}

type strokeStyle = "solid" | "dashed" | "dotted" | "handdrawn";
type strokeWidth = 1 | 2 | 4
type strokeColor = "#1e1e1e" | "#e03131" | "#2f9e44" | "#1971cD" | "#f08c00"
type fillColor = "#ffc9c9" | "#b2f2bb" | "#a5d8ff" | "#ffec99"
export type Button = {
  icon: ReactNode
  margin?: string
  title?: string
  tool?: Tools
  onClick?: () => void
}

export type ZoomComponentType = {
  canvasRef?: RefObject<HTMLCanvasElement | null> 
}

export type ToolEventHandlers = {
  onMouseDown: (e:MouseEvent,canvas:HTMLCanvasElement ,ctx:CanvasRenderingContext2D) => void
  onMouseMove: (e:MouseEvent,canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => void
  onMouseUp: (e:MouseEvent,canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => void
}

export type Tools = "pan" | "selector" | "rect" | "diamond" | "circle" | "arrow" | "line" | "draw" | "text" | "erase" | "image" | "zoomIn" | "zoomOut" | "reset" | "redo" | "undo";

export type ToolStore = {
    currentTool: Tools
    setTool: (tool: Tools) => void
    selectedShapeId : string | null
    setSelectedShapeId: (id:string) => void
}

export type Theme = {
    currentTheme: "dark" | "light"
    setTheme: (theme: "dark" | "light") => void
}

export type CanvasStore = {
    scale: number
    setScale: (s : number) => void
    resetScale: () => void
    startWorldX: number
    startWorldY: number
    cameraX: number
    cameraY: number
    setCamera: (x:number, y:number) => void
    screenX: number
    screenY: number
    
}

export type ShapeStore = {
    shapes: Shape[]
    addShape: (shape: Shape) => void
}

export type StyleStore = {
  strokeColor: strokeColor;
  fillColor: fillColor;
  strokeStyle: strokeStyle;
  strokeWidth: strokeWidth;
  setStrokeColor: (color: strokeColor) => void;
  setFillColor: (color: fillColor) => void;
  setStrokeStyle: (style: strokeStyle) => void;
  setStrokeWidth: (width: strokeWidth) => void;
}