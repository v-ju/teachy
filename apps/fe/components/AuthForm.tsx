import InputBox from "./FormInputBox";

export default function AuthForm(){
    return (<>
       
        <div className='min-h-screen flex items-center justify-center'>
          <div className='border-transparent bg-white/30 rounded-2xl '>
            <div className="flex flex-col justify-center items-center p-10">
              <InputBox width="full" placeholder="Email" type="text" viewIcon={false}/>
              <InputBox width="full" placeholder="Password" type="password" viewIcon={true}/>

              
            </div>
          </div>
        </div>
        
        
    
    </>
        
    )
}