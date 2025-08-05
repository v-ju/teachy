import { Button } from "../utils/types";
import { useToolStore } from "../utils/state";
import { on } from "events";


export function FunctionButton({icon,title, tool,onClick}: Button){
    const currentTool = useToolStore(state => state.currentTool)
    const setTool = useToolStore(state => state.setTool)

    return <button title={title} className={`cursor-pointer hover:bg-purple-100 p-2 size-8 flex items-center justify-center`} onClick={onClick}>
        {icon}
    </button>
}