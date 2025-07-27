import { Menu } from "lucide-react";
import { IconButton } from "./Iconbutton";


export function Sidebar(){
    return <div>
        <IconButton icon={<Menu/>} onClick={() => "hi"}/>
    </div>
}