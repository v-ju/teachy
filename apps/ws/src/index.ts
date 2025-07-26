import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import {ACCESS_TOKEN_SECRET} from '@repo/shared/config'
import {prismaClient} from '@repo/db/client'

const wss = new WebSocketServer({port : 8080})

interface User {
    ws:WebSocket
    rooms: string[]
    userId: string
}

const users: User[] = []

function authenticateUser(token:string): string | null {
    try{
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
        if(!decoded || typeof decoded === "string" || !decoded.id){
            return null;
        }

        return decoded.id;
    } catch(err){
        return null;
    }
}

wss.on("connection", function connection(ws, request) {
    
    // const authHeader = request.headers.authorization

    // if(!authHeader) {
    //     return;
    // }

    // const token = authHeader.split(" ")[1]

    // if(!token){
    //     return;
    // }

    // const userId = authenticateUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwNWQ4ZDdjLWNkNmEtNDE2NC04NWEyLWExYWY3N2ZlNzE3OSIsImVtYWlsIjoidmlqYXlhQDEuY29tIiwibmFtZSI6IlZpamF5YSIsImlhdCI6MTc1MzQ1MjkzOSwiZXhwIjoxNzUzNDc0NTM5fQ.ZEv8yYOS_Jw6TPOeE9nQQ-LV6Az6RwvDuwpTUyrql2E")

    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = authenticateUser(token);

    if(!userId) {
        ws.close()
        return null;
    }
    
    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on("message", async function message(data) {

        let parsedData;

        if(typeof data !== "string"){
            parsedData = JSON.parse(data.toString())
        }else {
            parsedData = JSON.parse(data)
        }

        if(parsedData.type === "join_room"){
            //whichever user has sent this join_room req , find that user in the global users array
            const user = users.find(x => x.ws  === ws)
            //in that users's rooms, push the roomid
            //TODO: check in db if roomId exists , is user allowed to have access etc
            user?.rooms.push(parsedData.roomId)
        }

        if (parsedData.type === "leave_room"){
            const user = users.find(x => x.ws === ws)
            if(!user){
                return;
            }
            //the user which sent the leave room req, filter only that room out and let other rooms be in user.rooms
            user.rooms = user.rooms.filter(x => x === parsedData.room)
        }

        if (parsedData.type === "chat"){
            const roomId = parsedData.roomId
            const message = parsedData.message
            //msgs should be queued to be put in db and then broadcasted

            await prismaClient.chat.create({
                data:{
                    roomId: Number(roomId),
                    userId,
                    message
                }
            })
            users.forEach((user) => {
                if (user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message,
                        roomId
                    }))
                }
            })
        }
    })
    
})
//ideally use headers not params

//get the url , queryparam, token queryparams user tries to connect
//decode token, make sure that userid exist on decoded, if yes then allow else close

//instead of checking here, we caan also do these checks on the http req which tries to connect to this ws

// Instead of global variables, use Singletons