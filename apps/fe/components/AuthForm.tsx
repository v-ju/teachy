"use client"
import { useState } from "react";
import FormButton from "./FormButton";
import SigninForm from "./Signin";
import SignupForm from "./Signup";


export default function AuthForm(){

    const [loginState, setLoginState] = useState("Signin")

    return (   
        <div className='min-h-screen flex items-center justify-center'>
          <div className='border-transparent bg-white/30 rounded-2xl shadow-2xl'>
            <div className="flex flex-col justify-center items-center p-10">
              
              {loginState === "Signin" 
                ? <SigninForm/>
                : <SignupForm/>
              }
            
              {loginState === "Signin" ?
                <div className="text-sm ">
                  Dont have an account? <a onClick={() => setLoginState("Signup")}> Sign up </a>
                </div>
              : <div>
                  Already have an account? <a onClick={() => setLoginState("Signin")}> SignIn </a>
                </div>
              }

              <div className="flex items-center w-full my-4 ">
                <div className="flex-grow h-px bg-deep-purple"/>
                    <span className="mx-1 text-gray-700 font-medium text-xs">OR</span>
                <div className="flex-grow h-px bg-deep-purple"/>
              </div>

              <FormButton width="full" text="Sign in with Google"/>
            </div>
          </div>
        </div>        
    )
}