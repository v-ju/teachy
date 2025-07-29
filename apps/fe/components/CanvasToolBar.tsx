import { ToolButton } from './ToolButton'
import { Pencil, RectangleHorizontalIcon, Diamond, Circle, Minus, ArrowRight, Type, EraserIcon, Hand, MousePointer2, ImagePlusIcon} from 'lucide-react'


export function ToolBar(){
      
    return <div className='flex absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-xl  text-white p-1 rounded-xl'>    
            <ToolButton icon={<Hand color='black'/>} margin='mx-1' title='Hand (panning tool)' tool='pan'/>
            <ToolButton icon={<MousePointer2 color='black'/>} margin='mx-1' title='Selection' tool='selector'/>
            <ToolButton icon={<RectangleHorizontalIcon color='black'/>} margin='mx-1' title='Rectangle' tool='rect'/>
            <ToolButton icon={<Diamond color='black'/>} margin='mx-1' title='Diamond' tool='diamond'/>
            <ToolButton icon={<Circle color='black'/>} margin='mx-1' title='Circle' tool='circle'/>
            <ToolButton icon={<ArrowRight color='black'/>} margin='mx-1'  title='Arrow' tool='arrow'/>
            <ToolButton icon={<Minus color='black'/>} margin='mx-1' title='Line' tool='line'/>
            <ToolButton icon={<Pencil color='black'/>} margin='mx-1' title='Draw' tool='draw'/>
            <ToolButton icon={<Type color='black'/>} margin='mx-1' title='Text' tool='text'/>
            <ToolButton icon={<EraserIcon color='black'/>} margin='mx-1' title='Eraser' tool='erase'/>
            <ToolButton icon={<ImagePlusIcon color='black'/>} margin='mx-1' title='Insert Image' tool='image'/>
        </div>
    
}