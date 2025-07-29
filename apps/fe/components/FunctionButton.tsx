import { Button } from "../types";
import { useToolStore } from "../state";


export function FunctionButton({icon,title, tool}: Button){
    const currentTool = useToolStore(state => state.currentTool)
    const setTool = useToolStore(state => state.setTool)

    return <button title={title} className={`cursor-pointer hover:bg-purple-100 p-2 size-8 flex items-center justify-center`} onClick={() => setTool(tool!)}>
        {icon}
    </button>
}