import { NextFunction, Request, Response } from "express"
import {signinData, signupData, googleData, googleSignInSchema, signinSchema, signupSchema} from '@repo/zod/schema'
import prismaClient from '@repo/db/client'
import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {JWT_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '@repo/shared/config'


interface refreshPayload extends jwt.JwtPayload {
    id: string
}





export const signup = async(req: Request, res:Response) => {
    try{

        const parsedData = signupSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(403).json({error: "Invalid data!"})
            return 
        }
        const data : signupData = parsedData.data
        
        const existingUser = await prismaClient.user.findFirst({
            where:{
                email: data.email
            }
        })

        if(existingUser){
            res.json(403).json({error: "User already exists! Please signin."})
            return
        }

        if(typeof data.password === 'undefined'){
            res.status(403).json({error: "Password required for manual signup!"})
            return
        }

        const hashedPassword = await bcrypt.hash(data.password,10)

        const user = await prismaClient.user.create({
            data:{
                name: data.name,
                email: data.email,
                password:hashedPassword
            }
        })

        res.status(200).json({
            userId : user.id
        })


    }catch(err){
        res.status(411).json({error : "Error while signing up.."})
    }

}


const createAccessToken = (user: {}) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: 6 * 60 * 60 })
}


const createRefreshToken = (user: {}) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, {expiresIn: 30 * 24 * 60 * 60 * 1000 })
}


export const signin = async(req: Request, res:Response) => {
    const parsedData = signinSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(403).json({error: "Invalid data"})
        return
    }
    const data: signinData = parsedData.data
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                email: data.email,
            }   
        })   
        
        if(!user){
            res.status(403).json({error: "User doesn't exist!"})
            return
        }

        if(!data.password || !user.password){
            res.status(403).json({ message: "No password!"})
            return
        }

        const password = await bcrypt.compare(data.password, user.password)

        if(!password){
            res.status(403).json({message: "Passwords don't match!"})
            return
        }

        const tokenizedData = {id: user.id, email: user.email, name: user.name}

        const accessToken = createAccessToken(tokenizedData)

        const refreshToken = createRefreshToken(tokenizedData)
        
        await prismaClient.user.update({
            where: {id: user.id},
            data: {refreshToken}
        })

        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/refresh'
        })

        res.json({
            accessToken,
            expiresIn : 6 * 60 * 60,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })


    }catch(err){
        res.status(403).json({error: "Error signing up"})
    }
}

export const googleSignIn = async(req:Request, res: Response) => {
    
    const parsedData = googleSignInSchema.safeParse(req.body)

    if(!parsedData.success || !parsedData.data){
        res.status(403).json({error: "Invalid Data!"})
        return
    }

    const {email, name, photo, googleId} = parsedData.data
    let user;
    user = await prismaClient.user.findFirst({
            where:{
                email
            }
        })
    
    if(!user){
        user = await prismaClient.user.create({
            data: {email, name, photo, googleId}
        })
    }

    const refreshToken = createRefreshToken({id: user.id, name: user.name, email: user.email})

    await prismaClient.user.update({
        where:{id: user.id},
        data: {refreshToken}
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    const accessToken = createAccessToken({id: user.id, name: user.name, email: user.email})

    return res.json({ accessToken, expiresIn: 6 * 60 * 60 })

}

export const renewRefreshToken = async(req:Request, res: Response) => {
    const  token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ error: "No refresh token" })
    }
    let payload;
    try {
        payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as refreshPayload
    }catch(err){
        return res.status(403).json({ error: "Invalid refresh token" });
    }

    const user = await prismaClient.user.findUnique({
        where: {id : payload.id}
    })


    if (!user || !user.refreshToken !== token){
        return res.status(403).json({error: "User not found or Token mismatched!"})
    }

    const tokenizedData = {id: user.id, email: user.email, name: user.name}

    const renewedRefreshToken = createRefreshToken(tokenizedData)

    await prismaClient.user.update({
        where: {id : user.id},
        data: {refreshToken: renewedRefreshToken}
    })

    res.cookie("refreshToken", renewedRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none"
    })

    const renewedAccessToken = createAccessToken(tokenizedData)
    return res.json({
        accessToken: renewedAccessToken,
        expiresIn: 6 * 60 * 60,
    });

}


export const createRoom = (req: Request, res:Response) => {

}


export const authMiddleware = (req: Request, res:Response, next: NextFunction) => {

}