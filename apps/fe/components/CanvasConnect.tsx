"use client"
import { useEffect, useState } from "react"
import {  RoomCanvas } from "./RoomCanvas"





export function CanvasConnect({roomId} : {roomId : string}){
    const [socket, setSocket] = useState<WebSocket | null>(null)
    useEffect(() => {
        //whenver the ws conn opens i.e user actually connected to user then we set socket to ws
        const ws = new WebSocket(`ws://localhost:8080?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwNWQ4ZDdjLWNkNmEtNDE2NC04NWEyLWExYWY3N2ZlNzE3OSIsImVtYWlsIjoidmlqYXlhQDEuY29tIiwibmFtZSI6IlZpamF5YSIsImlhdCI6MTc1MzUwNDAxNCwiZXhwIjoxNzUzNTI1NjE0fQ.T8mtkZa3kZfwpXfwgo3RXjQ3E6kmspG4YKQPEZ4tBVQ`)
        ws.onopen = () => {
            setSocket(ws)
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    },[])

    if(!socket){
        return <div>
            Connecting to server...
        </div>
    }

    return <div>
        <RoomCanvas roomId={roomId} socket={socket}/>
    </div>
}
