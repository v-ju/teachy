import { Router } from 'express'
import { googleSignIn, renewRefreshToken, signin, signup, } from '../controllers/userController'
import roomRouter from './rooms'

const userRouter:Router = Router()

userRouter.post('/signup',signup)

userRouter.post('/signin',signin)

userRouter.post('/google-signin', googleSignIn)

userRouter.post('/refresh', renewRefreshToken)

userRouter.use('/dashboard', roomRouter)

export default userRouter