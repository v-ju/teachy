import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port : 8080})

wss.on("connection", function connection(ws) {
    ws.on('message', function message(data){
        console.log('recieved ', data)
    })
    ws.send('msg log')
})
//ideally use headers not params

//get the url , queryparam, token queryparams user tries to connect
//decode token, make sure that userid exist on decoded, if yes then allow else close

//instead of checking here, we caan also do these checks on the http req which tries to connect to this ws