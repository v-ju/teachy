"use client"
import Image from "next/image"
import { useState } from "react"


interface InputBox  {
    placeholder:string
    type: string
    viewIcon? : boolean
}


export default function InputBox(props:InputBox){

    const [type, setType] = useState(false)

    const inputType = props.type === "password" && props.viewIcon ? (type ? "text" : "password" ) : props.type

    return (
        <div className={`relative w-80 my-3`}>
            
            <input
                placeholder={props.placeholder}
                type={inputType}
                className="bg-white border pr-10 p-3 border-gray-400 rounded-xl w-full "
            />

        
            {props.type === "password" && props.viewIcon && (
                <button
                type="button"
                onClick={() => setType((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                {type ? 
                <Image alt="noView" src="./noView.svg" width={20} height={20} className=""/> 
                : <Image alt="view" src="./view.svg" width={25} height={25}/> }
                </button>
        )}
        </div>
    )
}