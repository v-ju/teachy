import { CanvasConnect } from "../../../components/CanvasConnect"




export default async function Canvas({params} : {params : {roomId : string}}){
    const roomId = (await params).roomId
   

    return <CanvasConnect roomId={roomId}/>
    
}