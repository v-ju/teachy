import Image from "next/image";

export default function Header() {
    return (
        <header className="h-20">
            <nav className="flex">
                <div className="flex-1">
                    <Image alt="logo" src='/mainlogo.png' width={100} height={100}  />     
                </div>
               
                <div>
                    <button>
                        Login
                    </button>
                    <button>
                        Join Now
                    </button>
                </div>
            </nav>
           
        </header>
    )
}