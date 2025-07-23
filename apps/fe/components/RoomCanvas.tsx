import { useEffect, useState } from "react"
import { CanvasConnect } from "./CanvasConnect"



export function RoomCanvas({roomId} : {roomId : string}){
    const [socket, setSocket] = useState<WebSocket | null>(null)
    useEffect(() => {
        //whenver the ws conn opens i.e user actually connected to user then we set socket to ws
        const ws = new WebSocket("ws://localhost:8080")
        ws.onopen = () => {
            setSocket(ws)
        }
    },[])

    if(!socket){
        return <div>
            Connecting to server...
        </div>
    }

    return <div>
        <CanvasConnect roomId={roomId}/>
    </div>
}