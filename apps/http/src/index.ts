import express from 'express'
import userRouter from './routes/user';
import roomRouter from './routes/rooms';
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
app.use('', userRouter)








app.listen(3001)