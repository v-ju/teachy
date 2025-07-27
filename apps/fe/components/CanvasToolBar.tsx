
import { IconButton } from './Iconbutton'
import { Pencil, RectangleHorizontalIcon, Diamond, Circle, Minus, ArrowRight, Type, EraserIcon, Hand, MousePointer2, ImagePlusIcon} from 'lucide-react'
import { Shape } from '../types'

export function ToolBar({tool, setTool}: {tool:Shape, setTool: () => {}}){
      
    return <div className='flex'>    
        <IconButton icon={<Hand/>} margin='mx-1' onClick={() => "hi"} title='Hand (panning tool)'/>
        <IconButton icon={<MousePointer2/>} margin='mx-1' onClick={() => "hi"} title='Selection'/>
        <IconButton icon={<RectangleHorizontalIcon/>} margin='mx-1' onClick={() => "hi"} title='Rectangle'/>
        <IconButton icon={<Diamond/>} margin='mx-1' onClick={() => "hi"} title='Diamond'/>
        <IconButton icon={<Circle/>} margin='mx-1' onClick={() => "hi"} title='Circle'/>
        <IconButton icon={<ArrowRight/>} margin='mx-1' onClick={() => "hi"} title='Arrow'/>
        <IconButton icon={<Minus/>} margin='mx-1' onClick={() => "hi"} title='Line'/>
        <IconButton icon={<Pencil/>} margin='mx-1' onClick={() => "hi"} title='Draw'/>
        <IconButton icon={<Type/>} margin='mx-1' onClick={() => "hi"} title='Text'/>
        <IconButton icon={<EraserIcon/>} margin='mx-1' onClick={() => "hi"} title='Eraser'/>
        <IconButton icon={<ImagePlusIcon/>} margin='mx-1' onClick={() => "hi"} title='Insert Image'/>
    </div>
}