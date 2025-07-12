import { Router } from 'express'
import { googleSignIn, renewRefreshToken, signin, signup, } from '../controllers/userController'

const userRouter:Router = Router()

userRouter.post('/signup',signup)

userRouter.post('/signin',signin)

userRouter.post('/google-signin', googleSignIn)

userRouter.post('/refresh', renewRefreshToken)

export default userRouter