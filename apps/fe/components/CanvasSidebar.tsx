import { Menu } from "lucide-react";
import { FunctionButton } from "./FunctionButton";


export function Sidebar(){
    return <div className="absolute left-4 top-4 text-white border rounded-lg shadow-xl border-gray-300 bg-gray-100">
        <FunctionButton icon={<Menu color='black'/>}  />
    </div>
}