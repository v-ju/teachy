import Image from "next/image";
import Button from "./GenericButton";

export default function Header() {
    return (
        <div className="flex justify-center items-center ">
            <div className="border-transparent rounded-2xl  flex h-20 w-3/4 mt-2 ">
                <nav className="flex my-auto w-full">
                    <div className="flex-1">
                        <Image alt="logo" src='/mainlogo.png' width={140} height={140} className="my-1 mx-5"/>  
                    </div>   
                
                    <div className="my-auto mx-5">
                        <Button text="Login" variant="login"/>
                    </div>
                </nav>
            </div>            
        </div>        
    )
}


