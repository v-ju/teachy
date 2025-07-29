import { PlusIcon, MinusIcon } from "lucide-react";
import { FunctionButton } from "./FunctionButton";

export function ZoomButton (){

    return <div className="flex items-center absolute bottom-20 left-4 border border-gray-300 rounded-lg bg-gray-100 ">
       <FunctionButton icon={<MinusIcon color='black'/>} title="zoom out" tool="zoomOut"/>
       <button className="text-sm px-1 cursor-pointer " title="reset zoom">{"100%"}</button>
       <FunctionButton icon={<PlusIcon color='black'/>} title="zoom in" tool="zoomIn"/> 
    </div>   
}