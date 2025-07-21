"use client"
import { useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {signinSchema, signupSchema} from '@repo/zod/schema'
import { signIn } from "next-auth/react";
import axios from "axios";
import InputBox from "./FormInputBox";
import FormButton from "./FormButton";
import { useRouter } from "next/navigation";
import {SignupData, SigninData} from '@repo/types/type'
import { FieldErrors } from "react-hook-form";

export default function AuthForm(){

    const [loginState, setLoginState] = useState("Sign in")
    const currentSchema = useMemo(() => { return (loginState === "Sign in" ? signinSchema : signupSchema)}, [loginState])
    const router = useRouter();
    const {register, handleSubmit,formState: { errors } } = useForm<SigninData | SignupData>({resolver: zodResolver(currentSchema)});

    const onSubmitHandler = async(data: (SigninData | SignupData)) => {
      if (loginState === "Sign in") {
        const response = await signIn("credentials",{
          email: data.email,
          password: data.password
        })

        if(!response?.error){
          console.log("Signin success, NextAuth cookie set");
          router.push("/dashboard");
        }else {
          console.error("Signin failed:", response.error);
          return
        }
      } else if(loginState === "Sign up") {
         try{
          const res = await axios.post('http://localhost:3001/signup',{
            name: data.email,
            email: data.email,
            password: data.password
          })

          if(res){
            console.log("Signup Successful")
          }
        }catch(error){
          console.error("Signup failed:", error);
          return
        }
      }
    }

    return (   
        <div className='min-h-screen flex items-center justify-center'>
          <div className='border-transparent bg-white/30 rounded-2xl shadow-2xl'>
            <div className="flex flex-col p-10 ">
              
              <form key={loginState} onSubmit={handleSubmit(onSubmitHandler)} >

                {loginState === "Sign up" 
                ? <><InputBox  placeholder="Name" type="text" viewIcon={false} register={register('name')}/>
                  <p className='text-red-500 text-sm'>{(errors as FieldErrors<SignupData>).name?.message}</p>
                </>
                : null}

                <div className="flex flex-col justify-center items-start">
                  <InputBox  placeholder="Email" type="text" viewIcon={false} register={register('email')}/>
                  <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                  <InputBox  placeholder="Password" type="password" viewIcon={true} register={register('password')}/>
                  <p className='text-red-500 text-sm'>{errors.password?.message}</p>
                </div>
                
                <div className="flex flex-col justify-center items-center">
                  <FormButton width={30} text={loginState} type="submit"/>
               
              
                  {loginState === "Sign in" ?
                    <div className="text-sm">
                      Dont have an account? <a onClick={() => setLoginState("Sign up")}> Sign up </a>
                    </div>
                  : <div className="text-sm">
                      Already have an account? <a onClick={() => setLoginState("Sign in")}> Sign In </a>
                    </div>
                  }

                </div>
                
                <div className="flex items-center w-full my-4 ">
                  <div className="flex-grow h-px bg-deep-purple"/>
                      <span className="mx-1 text-gray-700 font-medium text-xs">OR</span>
                  <div className="flex-grow h-px bg-deep-purple"/>
                </div>

                <FormButton width="full" text="Sign in with Google" type="button" onClick={() => signIn('google')}/>
              </form>
            </div>
          </div>
        </div>        
    )
}