import {create} from 'zustand'
import { CanvasStore, Shape,ShapeStore,Theme,ToolStore ,StyleStore} from './types';




export const useToolStore = create<ToolStore>(
    (set) => ({
        currentTool: "selector",
        setTool: (tool) => set({currentTool : tool}),
        
    })
) 

export const useThemeStore = create<Theme>((set) => ({
    currentTheme: "light",
    setTheme: (theme) => set({currentTheme : theme})
}))


export const useCanvasStore = create<CanvasStore>((set,get) => ({
    scale: 1,
    setScale: (currentScale) =>  set({scale : currentScale }),
    resetScale: () => {
        set({scale: 1})
    },
    cameraX: 0,
    cameraY: 0,
    setCamera: (x,y) => set({cameraX: x, cameraY:y}),
    screenX:0,
    screenY:0,
    startWorldX:0,
    startWorldY:0    
}))


export const useShapeStore = create<ShapeStore>((set) => ({
    shapes: [],
    addShape: (shape: Shape) => set((s) => ({shapes: [...s.shapes,shape]})),
    selectedShapeId: null ,
    setSelectedShapeId: (id) => set({selectedShapeId: id})
}))

export const useStyleStore = create<StyleStore>((set) => ({
    strokeColor: "#e03131",
    fillColor: "#ffc9c9",
    strokeStyle: "dashed", 
    strokeWidth: 1,
    setStrokeColor: (color) => set({strokeColor: color}),
    setFillColor: (fill) => set({fillColor: fill}),
    setStrokeStyle: (style) => set({strokeStyle: style}),
    setStrokeWidth: (width) => set({strokeWidth : width}) 
}))