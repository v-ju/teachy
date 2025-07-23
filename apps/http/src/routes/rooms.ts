import { Router } from 'express'
import { createRoom, getRoom } from '../controllers/roomController'
import { authMiddleware } from '../controllers/authmiddleware'

const roomRouter:Router = Router()

roomRouter.post('/room', authMiddleware, createRoom)

roomRouter.get("/:roomId", authMiddleware, getRoom)

export default roomRouter