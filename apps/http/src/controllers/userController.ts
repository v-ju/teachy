import { NextFunction} from "express"
import type {RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {googleSignInSchema, signinSchema, signupSchema} from '@repo/zod/schema'
import prismaClient from '@repo/db/client'
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from '@repo/shared/config'


interface refreshPayload extends jwt.JwtPayload {
    id: string
}

export const signup:RequestHandler = async(req, res) => {
    try{
        console.log("signup hit")
        const parsedData = signupSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(403).json({error: "Invalid data!"})
            return 
        }
        const data = parsedData.data
        
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

export const signin:RequestHandler = async(req, res) => {
    console.log("signin hit")
    const parsedData = signinSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(403).json({error: "Invalid data"})
        return
    }
    const data = parsedData.data
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

export const googleSignIn:RequestHandler = async(req, res) => {
    
    const parsedData = googleSignInSchema.safeParse(req.body)
    console.log("raw body", req.body)
    if(!parsedData.success || !parsedData.data){
        res.status(403).json({error: "Invalid Data!"})
        return
    }
    
    const {email, name, image , googleId} = parsedData.data
    let user;
    user = await prismaClient.user.findFirst({
            where:{
                email
            }
        })
    
    if(!user){
        user = await prismaClient.user.create({
            data: {email, name, image, googleId}
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

    res.json({ accessToken, expiresIn: 6 * 60 * 60 })

}

export const renewRefreshToken:RequestHandler = async(req, res) => {
    const  token = req.cookies.refreshToken;
    if (!token) {
        res.status(401).json({ error: "No refresh token" })
        return 
    }
    let payload;
    try {
        payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as refreshPayload
    }catch(err){
        res.status(403).json({ error: "Invalid refresh token" });
        return 
    }

    const user = await prismaClient.user.findUnique({
        where: {id : payload.id}
    })


    if (!user || !user.refreshToken !== token){
        res.status(403).json({error: "User not found or Token mismatched!"})
        return 
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
    
    res.json({
        accessToken: renewedAccessToken,
        expiresIn: 6 * 60 * 60,
    });

}


