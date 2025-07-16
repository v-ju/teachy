import Link from "next/link"

export default function LoginButton(){
    return (
        <Link href='/signin' className="block relative border-0 border-transparent rounded-3xl w-27 h-11 hover:[animation:border-rotate_2s_linear_infinite,green-glow-pulse_2s_ease-in-out_infinite] bg-conic/[from_var(--border-angle)] from-black via-purple via-80% to-black flex justify-center items-center" >
            <span className=" px-8 py-2 bg-deep-purple text-white border-transparent border-0 rounded-full">Login</span>    
        </Link>
    )
}

