import { Router } from 'express'
import { createRoom } from '../controllers/roomController'

const roomRouter:Router = Router()

roomRouter.post('/room',createRoom)


export default roomRouter