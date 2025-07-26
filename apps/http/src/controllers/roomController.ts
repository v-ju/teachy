import type {RequestHandler } from 'express'
import {prismaClient, Prisma} from '@repo/db/client'

import { createRoomSchema } from '@repo/zod/schema'


const createSlug = (length = 3) => {
    const words = []
    const chars = "qwertyuiopmnbvcxzasdlkjfhg"
    for(let i=0; i < length; i++){
        let word = ''
        for(let j=0; j < 4; j++){
            word += chars[Math.floor(Math.random() * chars.length )]
        }
        words.push(word)
    }
    return words.join("-")
}

export const createRoom:RequestHandler = async(req, res) => {  
    const parsedData = createRoomSchema.safeParse(req.body)
    if (!parsedData.success){
        res.status(403).json({error: "Error creating room"})
        return
    }

    const userId = req.user.id

    if(!userId){
        res.status(403).json({error: "Invalid user. Cannot create room!"})
        return
    }

    let slug = createSlug()
    for(let i=0; i<3; i++){
        try{
            const room = await prismaClient.room.create({
                data: {
                        adminId: userId,
                        name: parsedData.data?.name,
                        slug
                }
            })
            res.json({room})
            return
        }catch(err){
            if (err instanceof Prisma.PrismaClientKnownRequestError ){
                slug = createSlug()
                continue;
            }

            res.status(500).json({error: "Error creating slug!"})
            return
        }
    }
    res.status(500).json({error: "Error creating room!"})
    return 
}

export const getRoom: RequestHandler = async(req,res) =>{
    try{
        const roomId = Number(req.params.roomId)
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        })

        res.json({messages})

    }catch(err){
        res.json({
            messages: []
        })
        return
    }
}