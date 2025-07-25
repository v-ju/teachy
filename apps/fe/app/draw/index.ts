import axios from "axios"

type Shape = {
    type: "rect"
    x: number
    y: number
    width: number
    height: number
} | {
    type: "circle"
    centerX:number
    centerY: number
    radius: number
}

export async function initDraw(canvas: HTMLCanvasElement,roomId:string, socket: WebSocket ){

    const ctx = canvas.getContext("2d")
    //stores all the shapes we draw in a session
    let existingShapes:Shape[] = await getExistingShapes(roomId)
    
    console.log(existingShapes)
    if(!ctx) {
        return
    }

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if(message.type === "chat"){
            const parsedShape = JSON.parse(message.message)
            existingShapes.push(parsedShape.shape)
            clearCanvas(existingShapes,canvas,ctx)
        }
    }

    clearCanvas(existingShapes,canvas, ctx)

    let clicked = false
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        //starts getting the origin points of shape we are drawing
        clicked = true
        startX = e.clientX
        startY = e.clientY
    })
    
    canvas.addEventListener("mouseup", (e) => {
        //whenever mouse or trackpad left, re calculates the width and height of shape and pushed that to array
        clicked = false
        const width = e.clientX - startX
        const height = e.clientY - startY
        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width,
            height
        }
        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({shape}),
            roomId
        }))

    })
    
    canvas.addEventListener("mousemove", (e) => {
        // when mousedown and cursor moved to give desired width and height to shape
        if (clicked) {
            const width = e.clientX - startX
            const height = e.clientY - startY
            //clears everything and renders old shapes again
            clearCanvas(existingShapes, canvas, ctx)
            //renders the current new shape
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(startX,startY,width,height)
            
            
        }
    })

}


function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement ,ctx: CanvasRenderingContext2D){
    //clearing the rect shape 
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width, canvas.height)

    //and then rendering old shapes again
    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255,255,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })
}

async function getExistingShapes(roomId:string){
    try{
    const res = await axios.get(`http://localhost:3001/dashboard/${roomId}`)
    const messages = res.data.messages

    const shapes = messages.map((x : {message :string}) => {
        const shapeData = JSON.parse(x.message)
        return shapeData.shape
    })

    return shapes}catch(err){
        console.log(err)
    }

}