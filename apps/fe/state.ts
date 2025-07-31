import {create} from 'zustand'

export type Tools = "pan" | "selector" | "rect" | "diamond" | "circle" | "arrow" | "line" | "draw" | "text" | "erase" | "image" | "zoomIn" | "zoomOut" | "reset" | "redo" | "undo";

type ToolStore = {
    currentTool: Tools
    setTool: (tool: Tools) => void
}

type Theme = {
    currentTheme: "dark" | "light"
    setTheme: (theme: "dark" | "light") => void
}

type Scale = {
    scale: number
    setScale: (s : number) => void
    zoomIn: () => void
    zoomOut: () => void
    resetScale: () => void
}

type CanvasStore = {
    worldX: number
    worldY: number
    cameraX: number
    cameraY: number
    screenX: number
    screenY: number
    setCamera: (x:number, y:number) => void
}

export const useToolStore = create<ToolStore>(
    (set) => ({
        currentTool: "selector",
        setTool: (tool) => set({currentTool : tool})
    })
) 

export const useThemeStore = create<Theme>((set) => ({
    currentTheme: "light",
    setTheme: (theme) => set({currentTheme : theme})
}))

export const useScaleStore = create<Scale>((set, get) => ({
    scale: 1,
    setScale: (currentScale) =>  set({scale : currentScale }),
    zoomIn: () => {
        const newScale = Math.min(get().scale + 0.1,5)
        set({scale: newScale})
    },
    zoomOut: () => {
        const newScale = Math.max(get().scale - 0.1,0.1)
    },
    resetScale: () => {
        set({scale: 1})
    }
}))

export const useCanvasStore = create<CanvasStore>((set,get) => ({
    cameraX: 0,
    cameraY: 0,
    screenX:0,
    screenY:0,
    worldX:0,
    worldY:0,
    setCamera: (x,y) => set({cameraX: x, cameraY:y})
}))