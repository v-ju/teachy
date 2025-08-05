import { ToolButton } from './ToolButton'
import { Pencil, RectangleHorizontalIcon, Diamond, Circle, Minus, ArrowRight, Type, EraserIcon,LucideHand, MousePointer2, ImagePlusIcon,Hand} from 'lucide-react'
import { useToolStore } from '../utils/state'

export function ToolBar(){
    const currentTool = useToolStore((state) => state.currentTool)
    return <div className='flex absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-xl  text-white p-1 rounded-xl'>    
            <ToolButton icon={<LucideHand color='black'/>} margin='mx-1' title='Hand (panning tool)' tool='pan'/>
            <ToolButton icon={<MousePointer2 color='black' fill="currentColor" className={`${currentTool === "selector" ? "text-black" : null}`}/>} margin='mx-1' title='Selection' tool='selector'/>
            <ToolButton icon={<RectangleHorizontalIcon color='black' fill="currentColor" className={`${currentTool === "rect" ? "text-black" : null}`}/>} margin='mx-1' title='Rectangle' tool='rect'/>
            <ToolButton icon={<Diamond color='black' fill="currentColor" className={`${currentTool === "diamond" ? "text-black" : null}`}/>} margin='mx-1' title='Diamond' tool='diamond'/>
            <ToolButton icon={<Circle color='black' fill="currentColor" className={`${currentTool === "circle" ? "text-black" : null}`}/>} margin='mx-1' title='Circle' tool='circle'/>
            <ToolButton icon={<ArrowRight color='black'/>} margin='mx-1'  title='Arrow' tool='arrow'/>
            <ToolButton icon={<Minus color='black' />} margin='mx-1' title='Line' tool='line'/>
            <ToolButton icon={<Pencil color='black' />} margin='mx-1' title='Draw' tool='draw'/>
            <ToolButton icon={<Type color='black' />} margin='mx-1' title='Text' tool='text'/>
            <ToolButton icon={<EraserIcon color='black' />} margin='mx-1' title='Eraser' tool='erase'/>
            <ToolButton icon={<ImagePlusIcon color='black' />} margin='mx-1' title='Insert Image' tool='image'/>
        </div>
    
}