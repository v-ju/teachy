import {MoonIcon, SunIcon} from 'lucide-react'
import { useThemeStore } from '../state'


export function Theme(){
    const {currentTheme, setTheme } = useThemeStore()


    return <div className='flex absolute right-10 top-4 border rounded-3xl border-purple-950'>
        <button className={`m-1 cursor-pointer ${currentTheme === "light" ? "opacity-100" : "opacity-0"} transition duration-500`} onClick={() => setTheme("dark")}>
            <MoonIcon color='purple' size={15}/>
        </button>
        <button className={`m-1 cursor-pointer ${currentTheme === "dark" ? "opacity-100" : "opacity-0"} transition duration-500`} onClick={() => setTheme("light")}>
            <SunIcon color='purple' size={15}/>
        </button>
    </div>
}