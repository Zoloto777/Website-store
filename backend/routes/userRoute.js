import express from 'express'
import { loginUser, registerUser, resetPassword, requestPasswordReset, getUsers, updateUsers, removeUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/forgot-password", requestPasswordReset)
userRouter.post('/reset-password/', resetPassword)
userRouter.post('/remove', removeUser)
userRouter.get('/users', getUsers)
userRouter.put("/update", updateUsers)

export default userRouter