"use client"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"


type ButtonProps = {
    text: string
    variant: "login" | "logout";
}


export default function Button({text,variant}:ButtonProps){

    const router = useRouter()

    const handleClick = async() => {
        if (variant === "login") {
            router.push('/signin')
        } else if (variant === "logout") {
            await signOut({ redirect: true, callbackUrl: "/signin"})
        }
    }

    return (
        <button className="relative border-0 border-transparent rounded-3xl w-27 h-11 hover:[animation:border-rotate_2s_linear_infinite,green-glow-pulse_2s_ease-in-out_infinite] bg-conic/[from_var(--border-angle)] from-black via-purple via-80% to-black flex justify-center items-center" onClick={handleClick}>
            <span className=" px-8 py-2 bg-deep-purple text-white border-transparent border-0 rounded-full">{text}</span>    
        </button>
    )
}

