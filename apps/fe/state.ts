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


type CanvasStore = {
    scale: number
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

export const useCanvasStore = create((set, get) => {})