import type {RequestHandler } from 'express'
import prismaClient from '@repo/db/client'

export const createRoom:RequestHandler = async(req, res) => {  

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