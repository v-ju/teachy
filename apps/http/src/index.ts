import express from 'express'
import userRouter from './routes/user';
import roomRouter from './routes/rooms';

const app = express();
app.use(express.json())

app.use('', userRouter)

app.use('/dashboard', roomRouter)






app.listen(3001)