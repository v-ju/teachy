import { ReactNode } from "react"




interface IconButton {
    icon: ReactNode,
    margin?: string,
    title?: string
    onClick : () => void
}

export function IconButton({icon,margin,title,onClick}:IconButton){
    return <button title={title} className={`cursor-pointer rounded-lg px-2 ${margin} border border-transparent hover:bg-gray-500 text-white size-9 flex items-center justify-center`}>
            {icon}
    </button>
}   