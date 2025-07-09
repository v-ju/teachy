import { NextFunction, Request, Response } from "express"
import {signinSchema, signupSchema} from '@repo/zod/schema'
import prismaClient from '@repo/db/client'


export const signup = (req: Request, res:Response) => {
    const parsedData = signupSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(403).json({error: "Invalid data!"})
        return 
    }

    try{

        

    }catch(err){

    }

}


export const signin = (req: Request, res:Response) => {
    const parsedData = signinSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(403).json({error: "Invalid data"})
        return
    }

    try{
        


    }catch(err){

    }


}

export const createRoom = (req: Request, res:Response) => {

}


export const authMiddleware = (req: Request, res:Response, next: NextFunction) => {

}