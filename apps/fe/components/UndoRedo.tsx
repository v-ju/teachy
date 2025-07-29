import { Undo2Icon, Redo2Icon } from "lucide-react";
import { FunctionButton } from "./FunctionButton";

export function Redo(){
    return <div className="flex absolute bottom-20 left-45 rounded-lg bg-gray-100 border border-gray-300">
        <FunctionButton icon={<Undo2Icon color='black' />} title="undo" tool="undo"/>
        <FunctionButton icon={<Redo2Icon color='black'/>} title="redo" tool="redo"/>
    </div>
}