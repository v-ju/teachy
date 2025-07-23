import { ACCESS_TOKEN_SECRET } from '@repo/shared/config'
import type {RequestHandler } from 'express'
import jwt from 'jsonwebtoken'



export const authMiddleware:RequestHandler = (req, res, next) => {
    const header = req.headers.authorization
    const token = header?.split(" ")[1]

    if(!token) { 
        res.status(403).json({error: "No token!"}) 
        return
    }

    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err) {
        res.status(403).json({error: "Invalid or expired token!"})
    }
    
}