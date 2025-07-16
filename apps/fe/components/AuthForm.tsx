"use client"
import { useMemo, useState } from "react";
import FormButton from "./FormButton";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputBox from "./FormInputBox";
import {signinSchema, signupSchema} from '@repo/zod/schema'



export default function AuthForm(){

    const [loginState, setLoginState] = useState("Sign in")
    const currentSchema = useMemo(() => { return (loginState === "Sign in" ? signinSchema : signupSchema)}, [loginState])

    const {register, handleSubmit,formState: { errors } } = useForm({resolver: zodResolver(currentSchema)});

    const onSubmitHandler = () => {

    }

    return (   
        <div className='min-h-screen flex items-center justify-center'>
          <div className='border-transparent bg-white/30 rounded-2xl shadow-2xl'>
            <div className="flex flex-col p-10">
              
              <form key={loginState} onSubmit={() => {}}>

                {loginState === "Sign up" 
                ? <InputBox  placeholder="Name" type="text" viewIcon={false}/>
                : null}

                <div className="flex flex-col justify-center items-center">
                  <InputBox  placeholder="Email" type="text" viewIcon={false}/>
                  <InputBox  placeholder="Password" type="password" viewIcon={true}/>
                  <FormButton width={30} text={loginState}/>
                </div>
               
              
                {loginState === "Sign in" ?
                  <div className="text-sm">
                    Dont have an account? <a onClick={() => setLoginState("Sign up")}> Sign up </a>
                  </div>
                : <div className="text-sm">
                    Already have an account? <a onClick={() => setLoginState("Sign in")}> Sign In </a>
                  </div>
                }

                <div className="flex items-center w-full my-4 ">
                  <div className="flex-grow h-px bg-deep-purple"/>
                      <span className="mx-1 text-gray-700 font-medium text-xs">OR</span>
                  <div className="flex-grow h-px bg-deep-purple"/>
                </div>

                <FormButton width="full" text="Sign in with Google"/>
              </form>
            </div>
          </div>
        </div>        
    )
}