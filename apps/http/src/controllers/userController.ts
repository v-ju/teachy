import { NextFunction, Request, Response } from "express"

export const signup = (req: Request, res:Response) => {
    // const parsedData = signupSchema.safeparse(req.body)
    // if(!parsedData.success){
    //     res.status(403).json({error: "Invalid data!"})
    //     return 
    // }

}


export const signin = (req: Request, res:Response) => {


}

export const createRoom = (req: Request, res:Response) => {

}


export const authMiddleware = (req: Request, res:Response, next: NextFunction) => {

}