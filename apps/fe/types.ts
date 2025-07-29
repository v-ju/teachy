import { ReactNode } from "react"
import { Tools } from "./state"

export type Shape =
  | {
      type: "rect"
      x: number
      y: number
      width: number
      height: number
    }
  | {
      type: "circle"
      centerX: number
      centerY: number
      radius: number
}

export type Button = {
  icon: ReactNode,
  margin?: string,
  title?: string,
  tool?: Tools
}