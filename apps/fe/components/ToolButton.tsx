
import { useToolStore } from "../utils/state"

import { Button } from "../utils/types"




export function ToolButton({icon,margin,title,tool}:Button){
    
    const currentTool = useToolStore((state) => state.currentTool)
    const setTool = useToolStore((state) => state.setTool)


    return <button title={title} className={`cursor-pointer rounded-lg px-2 ${margin} border border-transparent hover:bg-purple-100 text-white size-9 flex items-center justify-center ${currentTool === tool ? "bg-purple-200" : ""}`} onClick={() => setTool(tool!)}>
            {icon}
    </button>
}   