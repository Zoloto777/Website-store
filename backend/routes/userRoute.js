import express from 'express'
import { loginUser, registerUser, resetPassword, requestPasswordReset } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/forgot-password", requestPasswordReset)
userRouter.post('/reset-password/',resetPassword)
export default userRouter