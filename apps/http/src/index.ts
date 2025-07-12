import express from 'express'
import { signup } from './controllers/userController';

const app = express();


app.post('/signup',signup)

app.post('/signin')

app.post('/refresh')

app.post('/room')

app.get('/room')







app.listen(3001)