export default function LoginButton(){
    return (
        <button className="border-0 border-transparent rounded-3xl w-27 h-11 hover:[animation:border-rotate_3s_linear_infinite,green-glow-pulse_2s_ease-in-out_infinite] bg-conic/[from_var(--border-angle)] from-black via-purple via-70% to-black ">
            <span className=" px-8 py-3 bg-deep-purple text-white border-transparent border-0 rounded-full">Login</span>
            
        </button>
    )
}

